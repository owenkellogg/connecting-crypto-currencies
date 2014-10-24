# Send Payments

The primary purpose of a crypto currency network is to store and
occasionally transmit value in the form of payments to other user's
accounts on the network. Payments are archieved using digital
signatures which are cryptographically generated using your account's
secret key. Your account's signature is verifiable by anyone on the
network using your public key and the proper cryptographic algorithm.

### Bitcoin

Since bitcoind controls the secret key to your server's primary
bitcoin ledger account it can sign payments of bitcoins to other
users of the system. Use the RPC interface to send a payment:

  
    curl -u user:pass --data-binary '{"jsonrpc": "1.0", "id":"curltest", "walllet-send-345": "getbalance", "params": ['1BUBvNxW4v6fCx7Ye1D4XLmdq1MVi2VhKY', '0.001'] }' http://54.187.70.94:8332

Run the example to send a bitcoin payment from the bitcoind server:

    node lessons/3-send-payments/bitcoin.js

Bitcoind will respond with the transaction hash of the payment
that it signed and submitted to the network for validation and
inclusion in a block.

    {"result": 'a4250a7faa94613be58fa858d1f86bf1fe3df99759cfcb38fdff4f3616f6e09d',"error":null,"id":"wallet-send-345"}


(View the payment)[https://blockchain.info/tx/a4250a7faa94613be58fa858d1f86bf1fe3df99759cfcb38fdff4f3616f6e09d] on blockchain.info.

### Ripple

Ripple can send single currency and cross-currency payments to other accounts
on the network, using the same cryptographic signature scheme as bitcoin
to verify the validity of payments. Since the ripple daemon does not control
your ripple secret you must use a tool to sign payments using your secret key.

To send a payment to another Ripple account first query the network for a list
of possible payments from your account to the destination account. For instance
you could pay a bill denominated in Euros using your gold bullion balance, and
Ripple will calculate the market exchange rate for your payment. For more
straightforward payments such as direct XRP between two accounts, or direct
USD between two accounts still build a path first to determine whether a
payment is possible before signing and submitting your payment.

The following will compute all possible payments from my account to SnapSwap,
a prominent Ripple gateway. Snapswap will receive $1 USD, and Ripple calculates
the rate for me for each of USD, Gold Bullion, XRP, Bitcoin, Yuan:

    curl https://api.ripple.com/v1/accounts/r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk/payments/paths/rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q/1+USD

Run the example to build a payment:

    SECRET=<insert-ripple-account-secert> node lessons/4-send-payments/build-ripple.js

Ripple REST will respond with a list of possible payments, including the "paths"
the payment will traverse. Paths represent currency trades that are fulfilled
in order to facilitate the payment.
{

    "success": true,
    "payments": [
      {

          "source_account": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "source_tag": "",
          "source_amount": {
              "value": "0.0009288428694223804",
              "currency": "0158415500000000C1F76FF6ECB0BAC600000000",
              "issuer": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk"
          },
          "source_slippage": "0",
          "destination_account": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q",
          "destination_tag": "",
          "destination_amount": {
              "value": "1",
              "currency": "USD",
              "issuer": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q"
          },
          "invoice_id": "",
          "paths": "[[{\"account\":\"rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67\",\"type\":1,\"type_hex\":\"0000000000000001\"},{\"currency\":\"USD\",\"issuer\":\"rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B\",\"type\":48,\"type_hex\":\"0000000000000030\"},{\"account\":\"rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B\",\"type\":1,\"type_hex\":\"0000000000000001\"},{\"account\":\"rULnR9YhAkj9HrcxAcudzBhaXRSqT7zJkq\",\"type\":1,\"type_hex\":\"0000000000000001\"}],[{\"account\":\"rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67\",\"type\":1,\"type_hex\":\"0000000000000001\"},{\"currency\":\"USD\",\"issuer\":\"rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B\",\"type\":48,\"type_hex\":\"0000000000000030\"},{\"account\":\"rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B\",\"type\":1,\"type_hex\":\"0000000000000001\"},{\"account\":\"rwBWBFZrbLzHoe3PhwWYv89iHJdxAFrxcB\",\"type\":1,\"type_hex\":\"0000000000000001\"}],[{\"account\":\"rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67\",\"type\":1,\"type_hex\":\"0000000000000001\"},{\"currency\":\"USD\",\"issuer\":\"rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B\",\"type\":48,\"type_hex\":\"0000000000000030\"},{\"account\":\"rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B\",\"type\":1,\"type_hex\":\"0000000000000001\"},{\"account\":\"r9hEDb4xBGRfBCcX3E4FirDWQBAYtpxC8K\",\"type\":1,\"type_hex\":\"0000000000000001\"}],[{\"account\":\"rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67\",\"type\":1,\"type_hex\":\"0000000000000001\"},{\"currency\":\"USD\",\"issuer\":\"rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B\",\"type\":48,\"type_hex\":\"0000000000000030\"},{\"account\":\"rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B\",\"type\":1,\"type_hex\":\"0000000000000001\"},{\"account\":\"rnziParaNb8nsU4aruQdwYE3j5jUcqjzFm\",\"type\":1,\"type_hex\":\"0000000000000001\"}]]",
          "partial_payment": false,
          "no_direct_ripple": false

      },
      etc...
    }

Choose which payment you want to make, essencially which currency
to spent, and post that object directly back to the ripple REST
interface along with your secret key for signing the payment, and
Ripple REST will submit your signed payment to the network for 
validation.

    POST https://api.ripple.com/v1/accounts/{account}/payments
    {
      "client-resource-id": "<some unique id>",
      "secret": "<ripple acocunt secret>",
      "payment": "<payment from previous rpc call>"
    }

Ripple REST will respond with a success message a url to check the
status of the Ripple payment. The payment should be cleared within
the next ten seconds.

    { 
      success: true,
      client_resource_id: '39fa92cf-b743-4bde-a886-bfc7682b27e2',
      status_url: 'https://api.ripple.com/v1/accounts/r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk/payments/39fa92cf-b743-4bde-a886-bfc7682b27e2'
    }


### Dogecoin

Since dogecoind controls the secret key to your server's primary
dogecoin ledger account it can sign payments of dogecoins to other
users of the system. Use the RPC interface to send a payment.

    curl -u user:pass --data-binary '{"jsonrpc": "1.0", "id":"curltest", "walllet-send-678": "sendtoaddress", "params": ['DLqKHmkn3wXLZVSMsYnSuZXdWBppYkBBtc', '1'] }' http://54.166.107.243:8000

Run the example to send a dogecoin payment from the dogecoind server:

    node lessons/4-send-payments/dogecoin.js

Dogecoind will respond with the transaction hash of the payment
that it signed and submitted to the network for validation and
inclusion in a block.

    {"result": '60d0d5ddb6344897c70d1eb1c5a31ef77a3ba3923bdd4f486254887929528e65',"error":null,"id":"wallet-send-678"}

