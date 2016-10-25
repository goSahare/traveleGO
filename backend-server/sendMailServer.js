var express = require('express');
var app = express();
var sendmail = require('sendmail')({silent: true});
var bodyParser = require('body-parser');
var twilio = require('twilio');
var PDFDocument = require('pdfkit');
var fs = require('fs');
var clientTwilio = twilio('AC8d457de4d5aed8fb2ed6cbe5dc0043dc', 'b2ea03086ddc6c0115bd574551695aa7');
var SabreDevStudio = require('sabre-dev-studio');

var sabre_dev_studio = new SabreDevStudio({
    client_id: 'V1:1zwun27bck7ih90m:DEVCENTER:EXT',
    client_secret: 'pOahD11C',
    uri: 'https://api.test.sabre.com'
});

app.use(bodyParser.json());                                 //support parsing of application/json type post data
app.use(bodyParser.urlencoded({extended: true}));           //support parsing of application/x-www-form-urlencoded post data
app.all('*', function (req, res, next) {                    // To handle "Access-Control-Allow-Headers" error if occur in browser while smtp connection.
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

function sendMail(res, body) {
    sendmail({
        from: 'no-reply@travelego.com',
        to: body.email,
        subject: 'Booking Confirmed from traveleGO',
        html: 'Hi ' + body.name + ' Your ticket is booked! Find your ticket as attachment',
        attachments: [{
            filename: 'ticket.pdf',
            path: './ticket.pdf'
        }]
    }, function (err, reply) {
        if (err) {
            res.send('Oops! There was an error.');
        } else {
            res.send('Email sent');
        }
    });
}

function sendSMS(ph, name) {
    clientTwilio.sendMessage({
        to: '+91' + ph,
        from: '+16302434483',
        body: 'Hi ' + name + ' , your ticket has been booked!, Have a safe journey.'
    }, function (error, message) {
        if (!error) {
            console.log('Message sent on:');
            console.log(message.dateCreated);
        } else {
            console.log(error, 'Oops! There was an error.');
        }
    });
}

// Function to create ticket in PDF format using pdfkit module.
function createPDF(body) {
    var doc = new PDFDocument;
    doc.pipe(fs.createWriteStream('ticket.pdf'));

    var text = 'Hi, ' + body.name + ' Ticket has been booked from ' + body.location.from.name + ' to ' +
        body.location.to.name + ', Enjoy your flight';
    console.log('text',text);

    doc.fillColor('black');
    doc.text(text, {
        paragraphGap: 10,
        indent: 20,
        align: 'justify',
        columns: 1
    });
    doc.end('ticket.pdf');
}

app.post('/sendEmail', function (req, res) {
    sendSMS(req.body.phone, req.body.name);
    createPDF(req.body);
    sendMail(res, req.body);
});

function callback(res, error, data) {
    if (error) {
        res.send(error);
    } else {
        res.send(JSON.stringify(JSON.parse(data)))
    }
}
app.post('/cities', function (req, res) {
    sabre_dev_studio.get('/v1/lists/supported/cities', {}, function (error, data) {
        callback(res, error, data)
    });
});

app.post('/flights', function (req, res) {
    console.log(req.body)
    // sabre_dev_studio.get('/v1/shop/flights/fares?origin=' + req.body.from + '&destination=' + req.body.to + '&lengthofstay=1&departuredate='+ req.body.formattedDate,
    sabre_dev_studio.get('/v1/shop/flights/fares?origin=' + req.body.from + '&destination=' + req.body.to + '&lengthofstay=1&departuredate=' + req.body.formattedDate,
        {}, function (error, data) {
            callback(res, error, data)
        });
});

app.listen(5000, function () {
    console.log('Backend server is listening to port 5000');
});
