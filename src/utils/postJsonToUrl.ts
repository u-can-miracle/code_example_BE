import * as request from 'request'

export const postJsonToUrl = (url, json = {}) => new Promise((resolve, reject) => {
	const options = {
		method: 'POST',
		url,
		json
	}

	request(options, (err, response, body) => {
		if(err){
			reject(err)
		} else {
			resolve(body)
		}
	})
})
