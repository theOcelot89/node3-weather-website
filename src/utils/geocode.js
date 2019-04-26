const request = require('request')

const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGhlb2NlbG90IiwiYSI6ImNqdXJmaGp0NTE5ZmM0NHFwcmdka2tjamYifQ.nf6gIWkjPYYI_E3Tmvl3YA&limit=1'
	request({url, json: true} , (error, {body}) => {
		if (error){
			callback('Unable to connect to location services!', undefined)
	    } else if (body.features.length === 0){
		  	callback('Unable to find location, try another search', undefined)
		} else {
			latitude = body.features[0].center[1]
			longtitude = body.features[0].center[0]
			place_name = body.features[0].place_name

			const data = {place_name: place_name,
				latitude: latitude,
				longtitude: longtitude
			}
			callback(undefined, data)
		}
	})
}

module.exports = geocode