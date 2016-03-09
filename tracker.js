const Tracker = require('bittorrent-tracker').Server
const downgrade = require('downgrade')
const unlimited = require('unlimited')
const bole = require('bole')

unlimited()

const log = bole('tracker')

module.exports = createTracker

function createTracker (config) {
  const tracker = Tracker({
    upd: false,
    http: false,
    ws: true
  })

  tracker.on('error', (err) => console.error(err.message))
  tracker.on('warning', (err) => console.warn(err.message))
  tracker.listen(config.ports.tracker, onListen(tracker))
}

function onListen (tracker) {
  return function () {
    log.info('tracker listening on ws port:' + tracker.ws.address().port)
    downgrade()
  }
}
