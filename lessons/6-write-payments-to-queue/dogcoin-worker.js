var Resque = require('node-resque');

var config = require(__dirname+'/../../environment.js');

var jobs = {
  "log": {
    perform: function(payment, callback) {
      console.log('Running the job for payment', payment);  
      callback(null, payment.hash);
    }
  }
};


var scheduler = new Resque.scheduler({connection: config.get('REDIS')}, function(){
  scheduler.start();
});

var worker = new Resque.worker({connection: config.get('REDIS'), queues: ['dogecoin:incoming']}, jobs, function(){
  worker.workerCleanup(); // optional: cleanup any previous improperly shutdown workers
  worker.start();
});

worker.on('start',           function(){ console.log("worker started"); })
worker.on('end',             function(){ console.log("worker ended"); })
worker.on('cleaning_worker', function(worker, pid){ console.log("cleaning old worker " + worker); })
worker.on('poll',            function(queue){ console.log("worker polling " + queue); })
worker.on('job',             function(queue, job){ console.log("working job " + queue + " " + JSON.stringify(job)); })
worker.on('reEnqueue',       function(queue, job, plugin){ console.log("reEnqueue job (" + plugin + ") " + queue + " " + JSON.stringify(job)); })
worker.on('success',         function(queue, job, result){ console.log("job success " + queue + " " + JSON.stringify(job) + " >> " + result); })
worker.on('failure',         function(queue, job, failure){ console.log("job failure " + queue + " " + JSON.stringify(job) + " >> " + failure); })
worker.on('error',           function(queue, job, error){ console.log("error " + queue + " " + JSON.stringify(job) + " >> " + error); })
worker.on('pause',           function(){ console.log("worker paused"); })

scheduler.on('start',             function(){ console.log("scheduler started"); })
scheduler.on('end',               function(){ console.log("scheduler ended"); })
scheduler.on('error',             function(error){ console.log("scheduler error >> " + error); })
scheduler.on('poll',              function(){ console.log("scheduler polling"); })
scheduler.on('working_timestamp', function(timestamp){ console.log("scheduler working timestamp " + timestamp); })
scheduler.on('transferred_job',    function(timestamp, job){ console.log("scheduler enquing job " + timestamp + " >> " + JSON.stringify(job)); })

