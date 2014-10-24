var dogecoin = require(__dirname+'/../../clients/dogecoin');

dogecoin.getBalance(function(error, balance) {
  if (error) { throw new Error(error) }
  console.log('balance', balance);
});

