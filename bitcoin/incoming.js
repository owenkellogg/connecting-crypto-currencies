const blockchain = require('blockchain-account-monitor');
var config = require('nconf');

config
  .load({ file: __dirname+'/../config.json'})
  .defaults({
    "HOST": "127.0.0.1",
    "PORT": "443",
    "CONFIRMATIONS": 1,
    "TYPE": "bitcoin" 
  })

const monitor = new blockchain.AccountMonitor({
  blockchainClient:  new blockchain.Client({
    host: config.get('HOST'),
    port: config.get('PORT'),
    user: config.get('USER'),
    pass: config.get('PASS')
    confirmations: config.get('CONFIRMATIONS'),
    type: config.get('TYPE')
  }),
  onBlock: function(block, next) {
    console.log('FOUND '+block.length+ ' transactions');
    console.log('block', block);
    next();
  },  
  timeout: 1000
});

monitor.lastBlockHash = config.get('LAST_BLOCK_HASH');

monitor.start();

