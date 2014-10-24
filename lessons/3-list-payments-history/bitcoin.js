var client = require(__dirname+'/../../clients/bitcoin.js');

client.listTransactions("", function(error, transactions) {

  console.log(error, transactions); 
});
