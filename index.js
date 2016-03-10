const config = {
  logLevel: 'debug',
  ports: {
    http: 1337,
    tracker: 9003
  }
}

require('./server-assets')(config)
require('./server-seed')(config)
require('./server-tracker')(config)
