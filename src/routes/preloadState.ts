import * as express from 'express'
import getPreloadedState from '../controllers/getPreloadedState'

const preloadedStateRouter = express.Router()

preloadedStateRouter.post('/preload-state', async (req, res, next) => {
	const { body: { state, headers, hash, newPassword, url, hashedEmail } } = req
	const preloadedState = await getPreloadedState({
		state,
		headers,
		hash,
		newPassword,
		res,
		url,
    hashedEmail,
	})

	res.json(preloadedState)
})

export default preloadedStateRouter
