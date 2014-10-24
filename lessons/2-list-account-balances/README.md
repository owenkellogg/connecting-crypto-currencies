
# List Account Balances

Each crypto currency network stores a list of all the user's
accounts and can derive their balances of the various digital
assets. Balances can be determined using each respective
RPC interface.

### Bitcoin

The bitcoind server software can technically store many bitcoin
accounts, but for this demonstration we will use only the root
account that is generated at installation. Each account has a
private key secret that controls the bitcoins; the addresses
generated in the previous lesson all represent the root account.
  
    curl -u user:pass --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getbalance", "params": [] }' http://54.187.70.94:8332

Run the example to generate a new wallet:

    node lessons/2-list-account-balances/bitcoin.js

Bitcoind will respond with the current balance of the root 
account controlled by the bitcoind:

    {"result":0.00100000,"error":null,"id":"curltest"}

### Ripple

Ripple has a single native currency called XRP used to pay network
usage fees, but an account can have balances that represent any
asset imaginable. The Ripple network ledger can determine the current
balances for each asset and asset issuer for a given account.

    curl https://api.ripple.com/v1/accounts/r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk/balances

Run the example to generate a new wallet:

    node lessons/2-list-account-balances/ripple.js

Ripple REST will respond with a list of balances owned by the
account provided. Each balance is issued by another Ripple user
and is composed of a currency code, balance amount, and issuing
user account identifier.

    {
      "success": true,
      "balances": [
        {
          "value": "45922.316371",
          "currency": "XRP",
          "counterparty": ""
        },
        {
          "value": "6.48076153211415",
          "currency": "XAU",
          "counterparty": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q"
        },
        {
          "value": "-5.40397942",
          "currency": "BTC",
          "counterparty": "rHKueQebtVU9cEamhBbMV8AEViqKjXcBcB"
        },
        {
          "value": "100",
          "currency": "BRL",
          "counterparty": "rxG2DqQEiboCd8w9PWBADgYETXDH6RDLB"
        }
      ]
    }

### Dogecoin

The dogecoind server software can technically store many dogecoin
accounts, but for this demonstration we will use only the root
account that is generated at installation. Each account has a
private key secret that controls the dogecoins; the addresses
generated in the previous lesson all represent the root account.

    curl -u user:pass --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getbalance", "params": [] }' http://54.166.107.243:8000

Run the example to generate a new wallet:

    node lessons/2-list-account-balances/dogecoin.js

Dogecoin will respond with the current balance of the root 
account controlled by the bitcoind:

    {"result":0.00100000,"error":null,"id":"curltest"}

