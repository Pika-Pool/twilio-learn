const http = require('http');
const express = require('express');
const { MessagingResponse, VoiceResponse } = require('twilio').twiml;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/sms', (req, res) => {
	const twiml = new MessagingResponse();

	twiml.message('The Robots are coming! Head for the hills!');

	res.writeHead(200, { 'Content-Type': 'text/xml' });
	res.end(twiml.toString());
});

app.post('/call', (req, res) => {
	const twiml = new VoiceResponse();
	twiml.say('Hey folks!! This is PikaPool');

	res.writeHead(200, { 'Content-Type': 'text/xml' });
	res.end(twiml.toString());
});

http.createServer(app).listen(process.env.PORT || 8000, () => {
	console.log('Express server listening on port ' + process.env.PORT || 8000);
});
