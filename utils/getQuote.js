const https = require('https');

const fetchJSON = options => {
	options = {
		method: 'GET',
		headers: {
			Accept: 'application/json',
		},
		...options,
	};

	return new Promise((resolve, reject) => {
		const req = https.request(options, res => {
			let data = '';
			res.on('data', d => {
				data += d;
			});

			res.on('end', () => {
				data = JSON.parse(data);
				if ('error' in data) return reject(data.error);
				resolve(data);
			});
		});

		req.on('error', error => {
			reject(error);
		});

		req.end();
	});
};

const genRandomCategory = async (getFromAllCategories = false) => {
	let availableCategories = ['funny', 'students', 'art'];

	if (getFromAllCategories) {
		const options = {
			hostname: 'quotes.rest',
			path: '/qod/categories.json',
		};

		const data = await fetchJSON(options);
		availableCategories = Object.keys(data.contents.categories);
	}

	const category =
		availableCategories[
			Math.floor(Math.random() * availableCategories.length)
		];
	return category;
};

const getQuote = async (getFromAllCategories = false) => {
	const result = {
		quote: `I'm not concerned about all hell breaking loose, but that a PART of hell will break loose.. It'll be much harder to detect.`,
		imgUrl: 'https://theysaidso.com/img/qod/qod-funny.jpg',
		category: 'funny',
	};

	try {
		const category = await genRandomCategory(getFromAllCategories);

		const options = {
			hostname: 'quotes.rest',
			path: `/qod.json?category=${category}`,
		};

		const data = await fetchJSON(options);
		const { quote, background: imgUrl } = data.contents.quotes[0];

		result = { quote, imgUrl, category };
	} catch (err) {
		console.error(err);
		result.err = err;
	}

	return result;
};

module.exports = getQuote;
