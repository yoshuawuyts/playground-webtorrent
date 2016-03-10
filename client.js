const vtorrent = require('virtual-webtorrent')
const vdom = require('virtual-dom')
const hyperx = require('hyperx')
const fs = require('fs')

const TORRENT = fs.readFileSync('./resources/rec1.torrent')

const hx = hyperx(vdom.h)

const tree = hx`
  <main>
    ${vtorrent({ torrent: TORRENT })}
  </main>
`

document.body.appendChild(vdom.create(tree))
