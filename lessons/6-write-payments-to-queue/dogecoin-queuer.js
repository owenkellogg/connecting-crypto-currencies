var Resque = require('node-resque');
var crypto = require('crypto');
const blockchain = require('blockchain-account-monitor');

var config = require(__dirname+'/../../environment.js');
var dogecoin = config.get('DOGECOIN');

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
      host: dogecoin.host,
      port: dogecoin.port,
      user: dogecoin.user,
      pass: dogecoin.pass,
      confirmations: 1,
      type: 'dogecoin',
      https: false
    }), 
    onBlock: function(block, next) {
      console.log('FOUND '+block.length+ ' transactions');
      console.log('block', block);

      block.forEach(function(payment) {
        queue.enqueue('dogecoin:incoming', 'log', [payment]);
        console.log('enqueued a payment', payment);
      });
      setTimeout(next, 3000);
    },  
    timeout: 1000
  });

  monitor.lastBlockHash = ''; 

  monitor.start();
});

