const spawn = require('electron-spawn')
const bole = require('bole')

const log = bole('server-seed')

module.exports = createSeed

function createSeed (config) {
  log.info('seed started')
  const electron = spawn(require.resolve('./derp'))
  electron.stderr.on('data', function (msg) {
    log.error(String(msg))
  })
  electron.stdout.on('data', function (msg) {
    log.info(String(msg))
  })
}
