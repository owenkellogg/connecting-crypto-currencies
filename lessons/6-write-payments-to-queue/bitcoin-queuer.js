var Resque = require('node-resque');
var crypto = require('crypto');
const blockchain = require('blockchain-account-monitor');

var config = require(__dirname+'/../../environment.js');
var bitcoin = config.get('BITCOIN');

var jobs = {
  "log": {
    perform: function(payment, callback) {
      console.log('Running the job for payment', payment);  
      callback(null, payment.hash);
    }
  }
};

var queue = new Resque.queue({ connection: config.get('REDIS')}, jobs, function(){

  const monitor = new blockchain.AccountMonitor({
    blockchainClient:  new blockchain.Client({
      host: bitcoin.host,
      port: bitcoin.port,
      user: bitcoin.user,
      pass: bitcoin.pass,
      confirmations: 1,
      type: 'bitcoin',
      https: false
    }), 
    onBlock: function(block, next) {
      console.log('FOUND '+block.length+ ' transactions');
      console.log('block', block);

      block.forEach(function(payment) {
        queue.enqueue('bitcoin:incoming', 'log', [payment]);
        console.log('enqueued a payment', payment);
      });
      setTimeout(next, 3000);
    },  
    timeout: 1000
  });

  monitor.lastBlockHash = ''; 

  monitor.start();
});

