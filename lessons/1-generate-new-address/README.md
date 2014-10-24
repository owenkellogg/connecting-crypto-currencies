
# Generate a New Address

In order to receive funds you must have access to a cryptographic
public/private key pair. The private key controls your funds and
the public key is used as an address to which people can send funds.

### Bitcoin

The bitcoind server controls the private portion of your
cryptographic key pair, thus only it can send payments on your
behalf. However using the bitcoin RPC interface you can generate a
new bitcoin address with which to receive funds from other bitcoin
users.

    curl -u user:pass --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnewaddress", "params": [] }' http://54.187.70.94:8332

Run the example to generate a new wallet:

    node lessons/1-generate-new-address/bitcoin.js

Bitcoind will respond with a new public key address that is related
to the bitcoind private key stored on the server:

    1EJcN13tV8dtjiPYggssrVppjUCeEJGxiM

### Ripple

Ripple networking servers do not store the private portion of
your key (though there is a project called gatewayd that does).
New wallets can be generated locally in javascript or via the
Ripple REST interface

    curl https://api.ripple.com/v1/wallet/new

Run the example to generate a new wallet:

    node lessons/1-generate-new-address/ripple.js

Ripple REST will respond with a public and private key pair
and a success message

    {
      "success": true,
      "wallet": {
        "address": "rPJT1bMFfxEGp9jS9f8MqypHFu8JHwyKJS",
        "secret": "shnVuQA5LCxZDbzr3xSpgWFDqtggn"
      }
    }

### Dogecoin

The dogecoin server controls the private portion of your
cryptographic key pair, thus only it can send payments on your
behalf. However using the dogecoin RPC interface you can generate a
new dogecoin address with which to receive funds from other dogecoin
users.

    curl -u user:pass --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnewaddress", "params": [] }' http://54.166.107.243:8000

Run the example to generate a new wallet:

    node lessons/1-generate-new-address/dogecoin.js

Dogecoind will respond with a new public key address that is related
to the dogecoind's private key stored on the server. Then the dogecoin-node
module tests that the generated wallet is a valid dogecoin public address:

    {
      isvalid: true,
      address: 'DC8BqTQwrgtF5d4JAfQQGGPpA1KKN3LdtG',
      ismine: true,
      isscript: false,
      pubkey: '024080fc3ba3f041bafd886f508865a78c1c2d3ed5ba6edaad7b30ba76af1802ec',
      iscompressed: true,
      account: '' 
    }

