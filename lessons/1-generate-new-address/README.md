
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

### Ripple

Ripple networking servers do not store the private portion of
your key (though there is a project called gatewayd that does).
New wallets can be generated locally in javascript or via the
Ripple REST interface

    curl https://api.ripple.com/v1/wallet/new

### Dogecoin

The dogecoin server controls the private portion of your
cryptographic key pair, thus only it can send payments on your
behalf. However using the dogecoin RPC interface you can generate a
new dogecoin address with which to receive funds from other dogecoin
users.

    curl -u user:pass --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnewaddress", "params": [] }' http://54.166.107.243:8000

