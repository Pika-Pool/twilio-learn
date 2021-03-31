const { MessagingResponse, VoiceResponse } = require('twilio').twiml;
const getQuote = require('./getQuote');

const createVoiceTwiml = async () => {
	const twiml = new VoiceResponse();
	twiml.say(await getVoiceMessage());

	return twiml;
};

const createSmsTwiml = async () => {
	const twiml = new MessagingResponse();

	const { message, imgUrl } = await getSmsMessage();

	const twimlMessage = twiml.message();
	twimlMessage.body(message);
	twimlMessage.media(imgUrl);

	return twiml;
};

const getVoiceMessage = async () => {
	const { quote, category, err } = await getQuote();
	const message =
		(err ? 'error in server.\n' : '') +
		`Hi! Here's a ${category} quote for you, ${quote}.\nFor an image to go with your quotes, send us an SMS`;

	return message;
};

const getSmsMessage = async () => {
	const { quote, category, imgUrl, err } = await getQuote();
	const message =
		(err ? 'error in server.\n' : '') +
		`Hi! Here's a ${category} quote for you, ${quote}.\nHere's an image to go with it: `;

	return { message, imgUrl };
};

module.exports = {
	createSmsTwiml,
	createVoiceTwiml,
	getSmsMessage,
	getVoiceMessage,
};
