var config = require('nconf')

config
  .file({ file: __dirname+'/config.json' })
  .defaults({
    "BITCOIN": {
    },
    "DOGECOIN": {
    },
    "RIPPLE": {
      "host": "api.ripple.com"
    },
    "REDIS": {
      package:   "redis",
      host:      "127.0.0.1",
      password:  "",
      port:      6379,
      database:  0,
      namespace: "resque",
    }
  });

module.exports = config;

