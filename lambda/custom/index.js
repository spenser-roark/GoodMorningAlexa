const Forecast = require('./Forecast/initialize');
const ForecastConfig = require('./Config/forecastConfig');

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
	return {
		outputSpeech: {
			type: 'PlainText',
			text: output
		},
		card: {
			type: 'Simple',
			title: `SessionSpeechlet - ${title}`,
			content: `SessionSpeechlet - ${output}`
		},
		reprompt: {
			outputSpeech: {
				type: 'PlainText',
				text: repromptText
			}
		},
		shouldEndSession
	};
}

function buildResponse(sessionAttributes, speechletResponse) {
	return {
		version: '1.0',
		sessionAttributes,
		response: speechletResponse
	};
}

exports.handler = (event, context, callback) => {
	let sessionAttributes = {};
	let responseSpeechlet = "Good morning, ";
	let responseTitle = "Test";

	const forecast = Forecast(ForecastConfig);

	forecast.get([40.7608, -111.8910], function(err, weather) {
		if (err || !weather) {
			responseTitle = "Error";
			responseSpeechlet = "Sorry, I was unable to get the weather";
		} else {
			responseTitle = "Current weather";
			responseSpeechlet += "It is currently " + weather.currently.temperature + " degrees fahrenheit. ";
			if (weather.currently.temperature < 40) {
				responseSpeechlet += "Yes, it is as cold as a witch's tit. ";
			}
			responseSpeechlet += "The weather outside right now is " + weather.currently.summary + ". ";

			responseSpeechlet += "Today's forecast is " + weather.hourly.summary + ". ";

			if (weather.hourly.summary.toLowerCase().indexOf("snow") !== -1) {
				responseSpeechlet += "It looks like there will be snow today. Ride at your own risk my dude. ";
			} else if (weather.hourly.summary.toLowerCase().indexOf("rain") !== -1) {
				responseSpeechlet += "Tut tut, it looks like rain. Have fun with that. ";
			}

			if (weather.alerts && weather.alerts.length > 0) {
				console.log(weather.alerts);
				const oneAlert = weather.alerts.length === 1;
				responseSpeechlet += "Warning, There " + (oneAlert ? "is " : "are ") + weather.alerts.length + " weather " + (oneAlert ? "alert " : "alerts ") + "today. ";
				responseSpeechlet += "I would recommend looking at that closely. A summary of the first alert reads, ";
				responseSpeechlet += weather.alerts[0].title + ". ";
				// ask if want to read the alert and ask for a response for each subsequent alert
			}
		}
		callback(null, buildResponse(sessionAttributes, buildSpeechletResponse(responseTitle, responseSpeechlet, null, true)));
	});
};
