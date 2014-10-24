var client = require(__dirname+'/../../clients/dogecoin.js');

client.listTransactions("", function(error, transactions) {

  console.log(error, transactions); 
});
