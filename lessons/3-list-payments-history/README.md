
# List Payment History

The Bitcoin and Dogecoin Blockchains, and the Ripple Ledger
are public databases of payments since the inception of
each blockchain. Payment history for a given account can be
obtained by querying the RPC interface.

### Bitcoin

    curl -u user:pass --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listtransactions", "params": [] }' http://54.187.70.94:8332

Run the example to list payments sent to an address owned
by your bitcoind server:

    node lessons/3-list-payments-history/bitcoin.js

Bitcoind will respond with a list of recent payments sent
to the account controlled by the bitcoind:

    {
        "error": null,
        "id": "curltest",
        "result": [
            {
                "account": "",
                "address": "1449R8iGrsiDqLYTS4PmGrE5dc66PU42K8",
                "amount": 0.001,
                "blockhash": "00000000000000000f8cfbde18837bdbff29e376067ed4a5104df982664932bb",
                "blockindex": 170,
                "blocktime": 1414104521,
                "category": "receive",
                "confirmations": 59,
                "time": 1414104360,
                "timereceived": 1414104360,
                "txid": "ec1a14de2eebe9e9f16e4ee2d878f05771fd489e29c8544e28c938831b05b257",
                "vout": 1,
                "walletconflicts": []
            },
            etc...
        ]
    }

### Ripple

Ripple has a single native currency called XRP used to pay network
usage fees, but an account can have balances that represent any
asset imaginable. The Ripple network ledger can determine the current
balances for each asset and asset issuer for a given account.

    curl https://api.ripple.com/v1/accounts/r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk/payments

Run the example to generate a new wallet:

    node lessons/3-list-payment-history/ripple.js

Ripple REST will respond with a list of payments associated with
the account provided:

    {
      "success": true,
      "payments": [
        <Payment>,
        <Payment>,
        <Payment>
      ]
    }

### Dogecoin

    curl -u user:pass --data-binary '{"jsonrpc": "1.0", "id":"list-txs-333", "method": "listtransactions", "params": [""] }' http://54.166.107.243:8000 | python -m json.tool

Run the example to list payments sent to an address owned
by your bitcoind server:

    node lessons/3-list-payments-history/dogecoin.js

Dogecoind will respond with a list of recent payments sent
to the account controlled by the dogecoind:

    {
      "error": null,
      "id": "list-txs-333",
      "result": [
        {
          "account": "",
          "address": "DCtPZ4nyik2ZG46ueWcEZ9w4vFc7VXkYJ4",
          "amount": -1.63,
          "blockhash": "f6ca456c83e662bb2f814f433587043b9bc98dde4e6f54a0ef4be5f38ac75740",
          "blockindex": 30,
          "blocktime": 1405911862,
          "category": "send",
          "confirmations": 122165,
          "fee": 0.21,
          "time": 1405911862,
          "timereceived": 1413813134,
          "txid": "35c0658d2e384032fbbc009caae1081a4105ab68dc1e2538ddf678de3866435e"
        },
        etc...
      ]
    }

