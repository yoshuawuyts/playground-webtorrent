const cablob = require('content-addressable-blob-store')
const serverRouter = require('server-router')
const Busboy = require('busboy')
const level = require('level')
const http = require('http')
const bole = require('bole')
const mime = require('mime')
const path = require('path')
const pump = require('pump')
const url = require('url')

const log = bole('server-save-file')
const store = cablob('./tmp/store')   // can be replaced with S3 backend
const db = level('./tmp/db')

bole.output({ level: 'debug', stream: process.stdout })
http.createServer(createRouter()).listen(1338)

function createRouter () {
  const router = serverRouter('/404')
  router.on('/404', handleNotFound)
  router.on('/file', {
    get: getFile,
    post: uploadFile
  })
  router.on('/list', listFiles)
  return router
}

function handleNotFound (req, res) {
  res.statusCode = 404
  res.end()
}

// GET /file?file=README.md
function getFile (req, res) {
  const query = url.parse(req.url, 2).query
  const file = query.file

  if (!file) {
    const msg = 'no filename specified'
    log.info(msg)
    res.statusCode = 500
    return res.end(msg)
  }

  db.get(file, function (err, value) {
    if (err) {
      res.statusCode = 500
      log.error(err)
      return res.end(err.message)
    }

    store.exists({ key: value }, function (err, exists) {
      if (err) {
        res.statusCode = 500
        log.error(err)
        return res.end(err.message)
      }

      if (!exists) {
        const msg = `${file} doesn't exist`
        res.statusCode = 400
        log.info(msg)
        return res.end(msg)
      }

      const rs = store.createReadStream({ key: value })
      const filename = path.basename(file)
      const mimetype = mime.lookup(filename)
      res.setHeader('Content-disposition', 'attachment; filename=' + filename)
      res.setHeader('Content-type', mimetype)
      rs.pipe(res)
    })
  })
}

function uploadFile (req, res, params) {
  const busboy = new Busboy({ headers: req.headers })

  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    var ws = store.createWriteStream({ key: filename })
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
