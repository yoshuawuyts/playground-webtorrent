const cablob = require('content-addressable-blob-store')
const serverRouter = require('server-router')
const Busboy = require('busboy')
const level = require('level')
const http = require('http')
const bole = require('bole')
const pump = require('pump')

const log = bole('server-save-file')
const blobs = cablob('./tmp/store') // can be replaced with S3 backend
const db = level('./tmp/db')

bole.output({ level: 'debug', stream: process.stdout })
http.createServer(createRouter()).listen(1338)

function createRouter () {
  const router = serverRouter('/404')
  router.on('/404', handleNotFound)
  router.on('/upload', { post: uploadFile })
  router.on('/list', listFiles)
  return router
}

function handleNotFound (req, res) {
  res.statusCode = 404
  res.end()
}

function uploadFile (req, res, params) {
  const busboy = new Busboy({ headers: req.headers })

  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    var ws = blobs.createWriteStream({ key: filename })
    pump(file, ws, function (err) {
      if (err) {
        log.error(err)
        res.statusCode = 500
        return res.end()
      }
      db.put(filename, ws.key, function (err) {
        if (err) {
          log.error(err)
          res.setHeader(500)
          return res.end()
        }
        res.end()
      })
    })
  })

  pump(req, busboy, function (err) {
    if (err) {
      res.statusCode(500)
      log.error(err)
      return res.end()
    }
  })
}

function listFiles (req, res) {
  db.createKeyStream().pipe(res)
}
