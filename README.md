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
- Record incoming payments in a database
- Send outgoing payments from a queue

### Generate a new payment address

#### Bitcoin

    getnewaddress ""

#### Ripple

    GET /v1/wallet/new

#### Dogecoin

    getnewaddress ""

### List Account Balances

#### Bitcoin

    getbalance <account> <minconf=1>

    getbalance "" 6

    listunspent <minconf=1>

#### Ripple

    GET /v1/accounts/:account/balances/

#### Dogecoin

    getbalance <account> <minconf=1>

    listunspent <minconf=1>

### List Payemnts History

#### Bitcoin

    listtransactions <account> <count=0> <from=0>

#### Ripple

    GET /v1/accounts/{account}/payments

#### Dogecoin

    listtransactions <account> <count=0> <from=0>

### Send Payments from an Account

#### Bitcoin

    sendtoaddress <address> <amount>

#### Ripple

    GET /v1/accounts/{account}/payments/paths/{destination}/{amount}

    POST /v1/accunts/{account}/payments/

####Dogecoin

    sendtoaddress <address> <amount>

### Monitor for Payments to an Address

#### Bitcoin

    listsinceblock <blockhash> <target-confirmations>

    // require('blockchain-account-monitor');

#### Ripple

    GET /v1/accounts/{account}/notifications/{transaction_hash}
    GET /v1/accounts/{account}/payments/{payment}

    // require('ripple-account-monitor');

#### Dogecoin

    listsinceblock <blockhash> <target-confirmations>

    // require('blockchain-account-monitor');

### Record Incoming Payments in a SQL Queue

#### Bitcoin

#### Ripple

    var Sequlize = require('sequelize');
    // Parse payment object into model

#### Dogecoin

### Send Outgoing Payments from a SQL Queue

#### Bitcoin

    // https://github.com/gatewayd/blockchain-bridge/blob/master/processes/out-to-blockchain.js

#### Ripple

    var Worker = require('sql-mq-worker');
    // Send payment as described above

#### Dogecoin

    // https://github.com/gatewayd/blockchain-bridge/blob/master/processes/out-to-blockchain.js

