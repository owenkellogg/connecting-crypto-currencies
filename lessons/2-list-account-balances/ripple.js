var http = require(__dirname+'/../../clients/http.js');

var account = 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'

http.get('https://api.ripple.com/v1/accounts/'+account+'/balances').end(function(error, response) {
  if (error) { throw new Error(error); }
  console.log(response.body); 
})

