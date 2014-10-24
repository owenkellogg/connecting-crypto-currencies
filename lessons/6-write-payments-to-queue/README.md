# Write Incoming Payments to Queue

When incoming payments come in from the various crypto currency
payment networks our applications should write the payments to a
message queue for processing by different components of the
application stack. Resque is a language-agnostic pattern for pushing
messages to a job queue and for defining functions that are performed
for each job.

## Redis

Resque is designed to run on top of Redis the scalable key-value
data store, and the [node-rescue module](https://github.com/taskrabbit/node-resque)
created by the engineering team at Task Rabbit is an excellent implementation
of the Resque interface for Node.js

Before running this demo you must install Redis on your machine.

### Bitcoin

Use the blockchain account monitor from the previous lesson to poll
for new payments and write them into the queue to be processed.
This example defintes a job named "log" that logs the incoming
bitcoin payment. Jobs are written to the "bitcoin:incoming" queue.

Start the worker process first, which will performs any jobs every
few seconds:

    node lessons/6-write-payments-to-queue/bitcoin-worker.js

Then start the bitcoin account monitor that writes new payments
into the queue:

    node lessons/6-write-payments-to-queue/bitcoin-queuer.js

### Ripple

Use the ripple account monitor from the previous lesson to poll
for new payments and write them into the queue to be processed.
This example defintes a job named "log" that logs the incoming
bitcoin payment. Jobs are written to the "ripple:incoming" queue.

Start the worker process first, which will performs any jobs every
few seconds:

    node lessons/6-write-payments-to-queue/ripple-worker.js

Then start the ripple account monitor that writes new payments
into the queue:

    node lessons/6-write-payments-to-queue/ripple-queuer.js


### Dogecoin

Use the blockchain account monitor from the previous lesson to poll
for new payments and write them into the queue to be processed.
This example defintes a job named "log" that logs the incoming
dogecoin payment. Jobs are written to the "dogecoin:incoming" queue.

Start the worker process first, which will performs any jobs every
few seconds:

    node lessons/6-write-payments-to-queue/dogecoin-worker.js

Then start the dogecoin account monitor that writes new payments
into the queue:

    node lessons/6-write-payments-to-queue/dogecoin-queuer.js

