const request = require('request')

const forecast = (latitude, longtitude, callback) => {
	const url = 'https://api.darksky.net/forecast/2a8ab655fcdd0a3497b5cf45c9935c2f/'+ latitude +',' + longtitude + '?units=si'
	request({url, json: true},(error, {body}) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined)
		} else if (body.error) {
			callback('wrong latitude or longtitude, please try again..', undefined)
		} else {
			const degrees = body.currently.temperature
   			const changeOfRain = body.currently.precipProbability
			const forecast = body.daily.data[0].summary +" It is currently "+ degrees + " degrees out. There is a " + changeOfRain + "% chance of rain."
			callback(undefined, forecast)   			
		}
	})
}

module.exports = forecast