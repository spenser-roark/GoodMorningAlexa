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
    callback(null, buildResponse(sessionAttributes, buildSpeechletResponse("Test", "Hello World", null, true)));
};
