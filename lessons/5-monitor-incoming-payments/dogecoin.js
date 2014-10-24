process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const blockchain = require('blockchain-account-monitor');

var config = require(__dirname+'/../../environment.js');
var dogecoin = config.get('DOGECOIN');

const monitor = new blockchain.AccountMonitor({
  blockchainClient:  new blockchain.Client({
    host: dogecoin.host,
    port: dogecoin.port,
    user: dogecoin.user,
    pass: dogecoin.pass,
    confirmations: 0,
    type: 'dogecoin',
    https: false
  }),
  onBlock: function(block, next) {
    console.log('FOUND '+block.length+ ' transactions');
    console.log('block', block);

    setTimeout(next, 3000);
  },  
  timeout: 1000
});

monitor.lastBlockHash = '23e1b5d9c4258352e6d34728816cde2d46968072cf8d8545184b832149bdb94b';

monitor.start();

