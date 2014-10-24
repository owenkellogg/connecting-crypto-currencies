var http = require('superagent');

http.get('https://api.ripple.com/v1/wallet/new').end(function(error, response) {

  console.log(response.body); 
})

