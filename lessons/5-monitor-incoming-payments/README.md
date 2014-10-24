# Monitoring for Incoming Payments

Each blockchain publicly broadcasts any new payments to all
participants in the network, but your applications are not
guaranteed to always be connected to the network requiring them
to process incoming payments asynchronously. By polling the
networking daemon for new payments made to our accounts we
can process payments serially over time.

### Bitcoin

The bitcoin network bundles payments together in a package
known as a block, delivering a new block of payments every
ten minutes or so. Payments are said to have one "confirmation"
for every subsequent block that is validated by the network
after the block containing the payment. Wait for up to six
additional blocks for (nearly) absolute certainty that you
have reveived the payment.

To process payments in order use the `listsinceblock` RPC
command to list all payments since a given block, which
your application records to keep track of its progress:

    curl -u user:pass --data-binary '{"jsonrpc": "1.0", "id":"listsinceblock", "method": "listsinceblock", "params": ["00000000000000000f8cfbde18837bdbff29e376067ed4a5104df982664932bb"] }' http://54.187.70.94:8332

Without parameters the call should return all payments since
the first known block:

    curl -u user:pass --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listsinceblock", "params": [] }' http://54.187.70.94:8332

The [Blockchain Account Monitor](https://github.com/stevenzeiler/blockchain-account-monitor) module for node.js available on NPM
will poll your bitcoin daemon server for new payments made to your
account and yield any new blocks of payments before moving on.

    node lessons/5-monitor-incoming-payments/bitcoin.js

Internally the Blockchain Account Monitor calls listsinceblock with the most recently processed block hash.

    bitcoin.listSinceBlock("00000000000000000f8cfbde18837bdbff29e376067ed4a5104df982664932bb", console.log);

Bitcoin will return a list of payments since the specified block:

    {
        "error": null,
        "id": "listsinceblock",
        "result": {
            "lastblock": "00000000000000000752f3a0e912fb9fb9bc9f6c1aa39490e92a7a7f04db29d6",
            "transactions": [
                {
                    "account": "",
                    "address": "1KM8UoxzFFZ1WJF3FzcqNrFozYp9NY6om4",
                    "amount": 0.001,
                    "category": "receive",
                    "confirmations": 0,
                    "time": 1414124735,
                    "timereceived": 1414124735,
                    "txid": "f6d19bc44b07c1ac9473e0607c1301d153d9fc4b5ddc3f1162b0b89d8ccd847d",
                    "vout": 1,
                    "walletconflicts": []
                }
            ]
        }
    }

### Ripple

Ripple bundles payments together in units called Ledgers, which the
network validates and propagates every five to ten seconds. Once a
ledger is validated and closed all the payments contained are
absolutely valid and no additional validation wait time is required
before processing the payment.

In order to process Ripple payments made to your Ripple account 
asynchronously over time, use the Ripple REST notifications api call:

    curl https://api.ripple.com/v1/accounts/r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk/notifications/82696C9A61B04D2CE5A73583572D2D46F78458B6B295A18B8ABC4591721F96B9

If any new payments have been sent to the Ripple acocunt specified,
the notification returned will specify the one next payment chronologically.

    {
      "success": true,
      "notification": {
        "account": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
        "type": "payment",
        "direction": "outgoing",
        "state": "validated",
        "result": "tesSUCCESS",
        "ledger": "9514503",
        "hash": "82696C9A61B04D2CE5A73583572D2D46F78458B6B295A18B8ABC4591721F96B9",
        "timestamp": "2014-10-22T17:43:20.000Z",
        "transaction_url": "http://api.ripple.com:5990/v1/accounts/r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk/payments/82696C9A61B04D2CE5A73583572D2D46F78458B6B295A18B8ABC4591721F96B9",
        "previous_hash": "5A9D35F67A8C8CEAE8317DA2F449F573273563481B3A03348000B3651E96F9E0",
        "previous_notification_url": "http://api.ripple.com:5990/v1/accounts/r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk/notifications/5A9D35F67A8C8CEAE8317DA2F449F573273563481B3A03348000B3651E96F9E0",
        "next_hash": "DE734D3B2EE2BBE23A8B2B114EF754DF6DD8D526791FAAAFB6980624D32F4459",
        "next_notification_url": "http://api.ripple.com:5990/v1/accounts/r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk/notifications/DE734D3B2EE2BBE23A8B2B114EF754DF6DD8D526791FAAAFB6980624D32F4459"
      }
    }

Use the transaction url provided to get details of the payment:

    http://api.ripple.com/v1/accounts/r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk/payments/82696C9A61B04D2CE5A73583572D2D46F78458B6B295A18B8ABC4591721F96B9

    {
      "success": true,
      "payment": {
        "source_account": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
        "source_tag": "",
        "source_amount": {
          "currency": "0158415500000000C1F76FF6ECB0BAC600000000",
          "issuer": "rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67",
          "value": "0.04394696883"
        },
        "source_slippage": "0",
        "destination_account": "rBgcqkvXC9XBDWxHAhWhyTneMHvtNLtaYR",
        "destination_tag": "",
        "destination_amount": {
          "currency": "USD",
          "issuer": "rBgcqkvXC9XBDWxHAhWhyTneMHvtNLtaYR",
          "value": "50"
        },
        "invoice_id": "",
        "paths": "[[{\"currency\":\"USD\",\"issuer\":\"rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q\",\"type\":48,\"type_hex\":\"0000000000000030\"},{\"account\":\"rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q\",\"type\":1,\"type_hex\":\"0000000000000001\"}]]",
        "no_direct_ripple": false,
        "partial_payment": false,
        "direction": "outgoing",
        "state": "validated",
        "result": "tesSUCCESS",
        "ledger": "9514503",
        "hash": "82696C9A61B04D2CE5A73583572D2D46F78458B6B295A18B8ABC4591721F96B9",
        "timestamp": "2014-10-22T17:43:20.000Z",
        "fee": "0.012",
        "source_balance_changes": [
          {
            "value": "-0.012",
            "currency": "XRP",
            "issuer": ""
          },
          {
            "value": "-0.043511850334355",
            "currency": "0158415500000000C1F76FF6ECB0BAC600000000",
            "issuer": "rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67"
          }
        ],
        "destination_balance_changes": [
          {
            "value": "50",
            "currency": "USD",
            "issuer": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q"
          }
        ],
        "memos": [
          {
            "MemoData": "7274312E302E31302D31",
            "MemoType": "636C69656E74"
          }
        ]
      }
    }

Notice the destination_balance_changes and source_balance_changes. These fields are the canonical
representation of the actual amount sent in the payment.

The [Ripple Account Monitor](https://github.com/stevenzeiler/ripple-account-monitor) module for node.js available on NPM
will poll your ripple REST server for new payments made to your
account and yield any payments before moving on.

    node lessons/5-monitor-incoming-payments/ripple.js

### Dogecoin

For dogecoin do exactly the same as for bitcoin

    node lessons/5-monitor-incoming-payments/dogecoin.js

