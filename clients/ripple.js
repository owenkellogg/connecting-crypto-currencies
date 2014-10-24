var RippleRestClient = require("ripple-rest-client").Client;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
var config = require('nconf')

config.file({ file: __dirname+'/../config.json' })

var client = new RippleRestClient({
  api: "https://"+config.get("RIPPLE")["HOST"],
  account: config.get("RIPPLE")["ACCOUNT"]
});

module.exports = client;

