var dogecoin = require(__dirname+'/../../clients/dogecoin');

dogecoin.getNewAddress(function(err, address) {
  this.validateaddress(address, function(err, info) {
    console.log(info);
  })
})

