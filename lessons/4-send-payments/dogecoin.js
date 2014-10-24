var client = require(__dirname+'/../../clients/dogecoin.js');

client.sendToAddress("DLqKHmkn3wXLZVSMsYnSuZXdWBppYkBBtc", 1, function(error, payment) {

  console.log(error, payment); 
});
