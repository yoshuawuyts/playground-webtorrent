var dragDrop = require('drag-drop')
var WebTorrent = require('webtorrent')
const sf = require('sheetify')

sf('./index.css', { global: true })

var client = new WebTorrent()

// When user drops files on the browser, create a new torrent and start seeding it!
dragDrop('body', function (files) {
  console.log(files)
  client.seed(files, function (torrent) {
    // Client is seeding the file!
    console.log('Torrent magnet link:', torrent.magnetURI)
  })
})
