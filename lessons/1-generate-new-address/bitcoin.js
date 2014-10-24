var client = require(__dirname+'/../../clients/bitcoin.js');

client.getNewAddress("",function(error, address) {
  if (error) { throw new Error(error); }

  console.log(address); 
});

