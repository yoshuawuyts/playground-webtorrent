const WebTorrent = require('webtorrent')

const client = new WebTorrent()

const magnet = 'magnet:?xt=urn:btih:1ae3af03de6599bd44fe1d45c3cfb4a5b0654de9&dn=1455847280938.gif&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io'
client.add(magnet, function (torrent) {
  torrent.files.forEach(function (file) {
    file.appendTo('body')
  })
})
