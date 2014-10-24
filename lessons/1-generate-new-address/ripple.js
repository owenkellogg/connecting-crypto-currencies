var http = require(__dirname+'/../../clients/http.js');

http.get('https://api.ripple.com/v1/wallet/new').end(function(error, response) {
  if (error) { throw new Error(error); }
  console.log(response.body); 
})

