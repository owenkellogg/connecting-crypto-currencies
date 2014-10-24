var bitcoin = require('bitcoin');
var config = require(__dirname+'/../environment.js');

var client = new bitcoin.Client(config.get("BITCOIN"));

module.exports = client;

