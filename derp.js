const webtorrent = require('webtorrent')
const fs = require('fs')

const torrentfile = path.join(__dirname, 'resources/movies/rec1.mov')

main()

function main () {
  const client = webtorrent()
  const file = fs.readFileSync(path.join(__dirname, './README.md'))
  client.seed(file, function (link) {
    process.stdout.write(link)
  })
  const torrent = fs.readFileSync(torrentfile)
  process.stdout.write('seed worker started pid=' + process.pid)
}
