if (process.env.NODE_ENV !== 'production')
	require('dotenv').config({ path: './.env' });

// imports
const express = require('express');
const twilioClient = require('twilio');

const {
	createSmsTwiml,
	createVoiceTwiml,
	getSmsMessage,
} = require('./utils/createTwiml');
const sendSms = require('./twilio-utils/send_sms');
const makeCall = require('./twilio-utils/make_call');

const app = express();

// middlewares
app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const validateTwilio = (req, res, next) => {
	const auth_token = process.env.TWILIO_AUTH_TOKEN;
	if (!twilioClient.validateExpressRequest(req, auth_token)) {
		const err = new Error('Request not from twilio');
		err.statusCode = 400;
		next(err);
	}

	next();
};

// routes
app.get('/sms', async (req, res) => {
	const { to } = req.query;

	const { message, imgUrl: mediaUrl } = await getSmsMessage();
	sendSms({ message, mediaUrl, to });
	// console.log({ message, mediaUrl, to });
	res.status(200).send('sms sent');
});

app.get('/call', (req, res) => {
	const { to } = req.query;

	makeCall({ url: '/call', to });
	res.status(200).send('calling...');
});

app.post('/sms', validateTwilio, async (req, res) => {
	const twimlSms = (await createSmsTwiml()).toString();
	res.writeHead(200, { 'Content-Type': 'text/xml' });
	res.end(twimlSms);
});

app.post('/call', validateTwilio, async (req, res) => {
	console.log('POST - /call');
	const twimlVoice = (await createVoiceTwiml()).toString();
	res.writeHead(200, { 'Content-Type': 'text/xml' });
	res.end(twimlVoice);
});

app.get('/test', (req, res) => {
	const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log(fullUrl);
	res.send('test');
});

app.all('*', (req, res) => {
	res.status(404).send('Invalid route');
});

// error handler
app.use((err, req, res, next) => {
	console.error('err==============================================err', err);
	res.status(err.statusCode || 500).json(err.message);
});

// listen
app.listen(process.env.PORT || 8000, () => {
	console.log(
		'Express server listening on port ' + (process.env.PORT || 8000)
	);
});
