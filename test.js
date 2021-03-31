const http = require('http');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const server = http.createServer((req, res) => {
	// we can access HTTP headers
	let data = '';
	req.on('data', chunk => (data += chunk));
	req.on('end', () => {
		//end of data
		console.log('\nComplete Data: ' + data);
		res.end();
	});

	const twiml = new VoiceResponse();
	twiml.say('Hello folks!!');

	res.writeHead(200, { 'Content-Type': 'text/xml' });
	console.log('twiml: ' + twiml.toString());
	res.end(twiml.toString());
});

server.listen(3000, () => console.log('Listening at http://localhost:3000/'));
