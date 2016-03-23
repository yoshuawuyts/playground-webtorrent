const webtorrent = require('webtorrent-hybrid')
const path = require('path')
const bole = require('bole')

const log = bole('server-seed')

const filePath = path.join(__dirname, 'resources/movies/rec1.mov')

module.exports = createSeed

function createSeed (config) {
  log.info('seed started')
  const server = webtorrent()
  server.seed(filePath, function (torrent) {
    log.info('torrentId (magnet link)', torrent.magnetURI)
  })
}
