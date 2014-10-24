var http = require(__dirname+'/../../clients/http.js');

var account = 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
var destination = 'r3E4QPPrHpFhZsWkgkEyxtTZc9Nzgn4tVS';
var secret = process.env.SECRET;

function findPaths(callback) {
  http
    .get('https://api.ripple.com/v1/accounts/'+account+'/payments/paths/'+destination+'/1+XRP')
    .end(function(error, response) {
      if (error) { return callback(error) }
      callback(null, response.body.payments);
    })
}

function getUUID(callback) {
  http
    .get('https://api.ripple.com/v1/uuid')
    .end(function(error, response) {
      if (error) { return callback(error) }
      callback(null, response.body.uuid);
    })
}

function sendPayment(payment, callback) {
  getUUID(function(error, uuid) {
    console.log('uuid', uuid);
    http
      .post('https://api.ripple.com/v1/accounts/'+account+'/payments')
      .send({
        secret: secret,
        client_resource_id: uuid,
        payment: payment
      })
      .end(function(error, response) {
        if (error) { return callback(error); }
        callback(null, response.body);
      });
  })
}

findPaths(function(error, payments) {
  console.log('found paths', payments);
  if (error) { throw new Error(error) }
  sendPayment(payments[0], function(error, payment) {
    if (error) { throw new Error(error) }

    console.log('sent payment');
    console.log(payment);
  });
})
