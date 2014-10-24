var bitcoin = require('bitcoin');

var config = require('nconf')

config.file({ file: __dirname+'/../config.json' })

var client = new bitcoin.Client(config.get("BITCOIN"));

module.exports = client;

