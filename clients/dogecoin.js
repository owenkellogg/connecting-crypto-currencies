var DogecoinClient = require('node-dogecoin');

var config = require('nconf')

config.file({ file: __dirname+'/../config.json' })

var client = new DogecoinClient(config.get("DOGECOIN"));

module.exports = client;

