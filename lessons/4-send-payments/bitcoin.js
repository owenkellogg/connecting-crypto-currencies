var client = require(__dirname+'/../../clients/bitcoin.js');

client.sendToAddress("1BUBvNxW4v6fCx7Ye1D4XLmdq1MVi2VhKY", 0.001, function(error, payment) {

  console.log(error, payment); 
});
