var client = require(__dirname+'/../../clients/bitcoin.js');

client.getBalance("", 6, function(error, balance) {

  console.log(error, balance); 
});
