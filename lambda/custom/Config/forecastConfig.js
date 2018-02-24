const forecastConfig = {
	service: 'darksky',
	key: '1038103aba064606c3f985238b0a931d',
	units: 'fahrenheit',
	cache: true,
	ttl: {
		minutes: 30,
		seconds: 0
	}
};

module.exports = forecastConfig;