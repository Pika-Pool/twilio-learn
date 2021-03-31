if (process.env.NODE_ENV != 'production') require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const toNumber = process.env.TWILIO_TO_NUMBER;
const fromNumber = process.env.TWILIO_FROM_NUMBER;

const client = require('twilio')(accountSid, authToken);

client.calls
	.create({
		url: 'http://demo.twilio.com/docs/voice.xml',
		to: toNumber,
		from: fromNumber,
	})
	.then(call => console.log(call))
	.catch(console.error);
