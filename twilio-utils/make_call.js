if (process.env.NODE_ENV != 'production') require('dotenv').config({path: './.env'});

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const toNumber = process.env.TWILIO_TO_NUMBER;
const fromNumber = process.env.TWILIO_FROM_NUMBER;

console.log({accountSid, authToken, toNumber, fromNumber});

const client = require('twilio')(accountSid, authToken);

const makeCall = ({ url, method, to }) => {
	client.calls
		.create({
			url: url || 'http://demo.twilio.com/docs/voice.xml',
			method: method || 'POST',
			to: to || toNumber,
			from: fromNumber,
		})
		.then(call => console.log(call.sid));
};

makeCall({url: 'https://36a12d26f8ac.ngrok.io/call'});

module.exports = makeCall;
