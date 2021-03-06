const serverRouter = require('server-router')
const summary = require('server-summary')
const browserify = require('browserify')
const logHttp = require('http-ndjson')
const pullHttp = require('pull-http')
const pull = require('pull-stream')
const bankai = require('bankai')
const bole = require('bole')
const http = require('http')
const path = require('path')

const clientp = path.join(__dirname, 'client.js')
const log = bole('main')

module.exports = createServer

function createServer (config) {
  bole.output({ level: config.logLevel, stream: process.stdout })
  const router = createRouter()
  const server = http.createServer(function (req, res) {
    const setSize = logHttp(req, res, log.debug)
    const source = pullHttp.createSource(req, res)
    const through = router(req, res, setSize)
    const sink = pullHttp.createSink(req, res, setSize)
    pull(source, through, sink)
  })
  server.listen(config.ports.http, summary(server))
}

function createRouter () {
  const router = serverRouter('/404')
  router.on('/', pullHttp.intercept(bankai.html({ css: false })))
  router.on('/bundle.js', pullHttp.intercept(bankai.js(browserify, clientp)))
  return router
}
