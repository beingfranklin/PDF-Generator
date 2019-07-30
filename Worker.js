const kue = require("kue");
const queue = kue.createQueue();
const pdfKit = require('pdfkit');
const fs = require('fs');
const output_folder = "OutputFolder";

function startProcess() {
    // listen to the queue
    // start processing email
    queue.process(output_folder, (job, done) => {
        // on each request generate the pdf
        generatePdfInvoice(job.data, done);
    });
}

function generatePdfInvoice(data, done) {
    let doc = new pdfKit;
    doc.pipe(fs.createWriteStream(`${__dirname}/${output_folder}/${data.title}.pdf`));
    doc.fontSize(14).text(data.template, 100, 100);
    doc.end();
    done();
}

startProcess();
kue.app.listen(4000);