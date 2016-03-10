const createTorrent = require('create-torrent')
const path = require('path')
const fs = require('fs')

const infile = path.join(__dirname, '/resources/movies/rec1.mov')
const outfile = path.join(__dirname, 'resources/rec1.torrent')
const opts = {
  announce: [ 'wss://tracker.webtorrent.io' ]
}
createTorrent(infile, opts, function (err, torrent) {
  if (err) {
    console.error(err.stack)
    process.exit(1)
  }
  fs.writeFile(outfile, torrent, function (err) {
    if (err) {
      console.log(err.stack)
      process.exit(1)
    }
  })
})
