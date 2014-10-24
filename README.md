# Connecting Crypto Currencies with Node.js

##Interact with Bitcoin, Ripple, and Dogecoin

The purpose of this course is to learn to interact with
three crypto-money networks directly with their
open APIs. Follow along by forking this repository.

For each of the three cpryto-money you will gain
the following abilities, all using Node.js:

- Generate new payment addresses
- List payments history
- Send payments from an account 
- Monitor for payments to the address
- Record incoming payments to a queue
- Send outgoing payments from a queue

## Getting started

Configuration for the bitcoind, dogecoind, and Ripple REST
rpc interfaces contains sensitive and secret information.
Put this configuration in config.json which is added to the
.gitignore file so you will not accidentally check your
secrets into source control.

You will also need Redis installed locally, which can be
done with your system's package manager. Once installed 
start Redis by running `redis-server`. Redis will be used
in the later lessons to provide a queuing service.

## Resources

### Bitcoin

    running bitcoind on ubuntu: https://degreesofzero.com/article/installing-bitcoind-on-ubuntu.html
    block explorer: https://blockexplorer.com/q/getblockcount
    using the bitcoind command line interface
    using the bitcoind rpc interface: https://en.bitcoin.it/wiki/Original_Bitcoin_client/API_calls_list
        ndoe-bitcoin javascript library for interacting with bitcoind: https://github.com/freewil/node-bitcoin
        generating new receive addresses: https://github.com/freewil/node-bitcoin
        monitoring for payments made to receive addresses: https://github.com/stevenzeiler/blockchain-account-monitor
        sending payments from the bitcoind wallet: https://github.com/freewil/node-bitcoin

### Ripple

    running Ripple REST on ubuntu: https://github.com/ripple/ripple-rest/#installing-and-running
    using the Ripple REST interface: http://dev.ripple.com/ripple-rest.html
        generating new ripple accounts: http://dev.ripple.com/ripple-rest.html#generate-account
        funding new ripple accounts with XRP: http://dev.ripple.com/ripple-rest.html#submit-payment
        monitoring for payments made to ripple accounts: https://github.com/stevenzeiler/ripple-account-monitor
        connecting to a gateway and currency: http://dev.ripple.com/ripple-rest.html#granting-a-trustline
        sending payments of currencies from a ripple account: http://dev.ripple.com/ripple-rest.html#prepare-payment

### Dogecoin

    running the dogecoind on ubuntu: http://b.agilob.net/such-address-many-dig-on-linux-wow/
    dogechain.info block explorer: https://dogechain.info/chain/Dogecoin
    using the dogecoin rpc interface: 
        (node.js dogecoin client)[https://github.com/countable/node-dogecoin]

### Resque

    (Node.js Resque client implementation by Task Rabbit)[https://github.com/taskrabbit/node-resque]
    (Resque home page)[http://resquework.org/]
    (Redis home page)[http://redis.io/]

