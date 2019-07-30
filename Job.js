// Code to read the file or database and create a Kue job
const kue = require('kue');
//Kue is a job queue running on top of Redis
const invoice = require('./inputdata');
const queue = kue.createQueue();

function startJob() {
    let invoiceData = invoice.content;
    invoiceData.forEach((key) => {
        // push data in queue
        let job = queue.create('invoice', {
            title: `Generate invoice ${key.index}`,
            template: key.text,
        }).delay(5000).priority('high').save((err) => {
            if (!err) {
                console.log('Job ' + job.id + ' added...');
            }
        });
    });
}
startJob();