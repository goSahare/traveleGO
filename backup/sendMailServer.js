var express = require('express');
var app = express();
var sendmail = require('sendmail')({silent: true});
var twilio = require('twilio');
var clientTwilio = twilio('AC8d457de4d5aed8fb2ed6cbe5dc0043dc', 'b2ea03086ddc6c0115bd574551695aa7');

function sendMail() {
    sendmail({
        from: 'no-reply@travelego.com',
        to: 'gourav.sahare@3plearning.com',
        subject: 'test sendmail',
        html: 'Hi from Gourav',
        attachments: [{
            filename: 'ticket.pdf',
            path: './ticket.pdf'
        }]
    }, function (err) {
        console.log(err)
    });
}

function sendSMS() {
    clientTwilio.sendMessage({
        to: '+918793425825',
        from: '+16302434483',
        body: 'Hi gourav'
    }, function (error, message) {
        // The HTTP request to Twilio will run asynchronously. This callback
        // function will be called when a response is received from Twilio
        // The "error" variable will contain error information, if any.
        // If the request was successful, this value will be "falsy"
        if (!error) {
            // The second argument to the callback will contain the information
            // sent back by Twilio for the request. In this case, it is the
            // information about the text messsage you just sent:
            console.log('Message sent on:');
            console.log(message.dateCreated);
        } else {
            console.log(error, 'Oops! There was an error.');
        }
    });
}

// To handle "Access-Control-Allow-Headers" error if occur in browser while smtp connection.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, ' +
        'x-parse-session-token');
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});

function createdPDF() {
    var PDFDocument = require('pdfkit');
    var fs = require('fs');

    var doc = new PDFDocument;
    doc.pipe(fs.createWriteStream('ticket.pdf'));

    var loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in...';

    doc.fillColor('black');
    doc.text(loremIpsum, {
        paragraphGap: 10,
        indent: 20,
        align: 'justify',
        columns: 2
    });

    doc.end('ticket.pdf');

}

app.get('/sendEmail', function (req, res) {
    console.log('sendEmail', req);
    // sendSMS();
    // createdPDF();
    // sendMail();

});


app.listen(5000, function () {
    console.log('app listening the port 5000');
});