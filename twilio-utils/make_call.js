const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const toNumber = process.env.TWILIO_TO_NUMBER;
const fromNumber = process.env.TWILIO_FROM_NUMBER;

const client = require('twilio')(accountSid, authToken);

const makeCall = ({ url, method, to }) => {
	client.calls
		.create({
			url: url,
			method: method || 'POST',
			to: to || toNumber,
			from: fromNumber,
		})
		.then(call => console.log(call.sid));
};

module.exports = makeCall;
