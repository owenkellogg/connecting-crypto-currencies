var http = require(__dirname+'/../../clients/http.js');

var account = 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
var destination = 'r3E4QPPrHpFhZsWkgkEyxtTZc9Nzgn4tVS';
var secret = process.env.SECRET;


function setTrustline(counterparty, currency) {
  var amount = 999999999;

  http
    .post('https://api.ripple.com/v1/accounts/r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk/trustlines')
    .send({
      trustline: {
        counterparty: counterparty,
        currency: currency,
        limit: amount
      },
      secret: secret
    })
    .end(function(error, response) {
      console.log(response.body);
    });
}

setTrustline('rJuSBKXvgBPmwsJGw4nTjNR5bd6ANuU915', 'DOG');
