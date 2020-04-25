import * as express from 'express'
import uploader from '../utils/uploader'
import handleResponse from '../utils/handleResponse'

const uploadRouter = express.Router()

const upload = uploader.any()

uploadRouter.post('/upload', (req, res, next) => {
	upload(req, res, (err: Error) => {
		if (err) {
			next(err)
		} else {
			const {
				location,
				mimetype,
				originalname,
				key,
			} = req.files[0]
			const result = {
				code: 200,
				data: {
					location,
					mimetype,
					originalname,
					key,
				},
			}

			handleResponse(res, result)
		}
	})
})

export default uploadRouter
