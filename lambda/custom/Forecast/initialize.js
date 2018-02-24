const Forecast = require('forecast');

function initialize(config) {
	const forecast = new Forecast(config);
	return forecast;
}

module.exports = initialize;