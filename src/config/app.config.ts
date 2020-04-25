import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as path from 'path'
import * as cookieParser from 'cookie-parser'
import envs from './envs'

export default function appConfig(app: express.Application) {
	app.use((req, res, next) => {
		// tslint:disable-next-line
		console.log('req.url', req.url)
		setTimeout(next, 200)
	})

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

	// parse application/json
	app.use(bodyParser.json())
	app.use(cookieParser(envs.secretCookie))

	app.use(
		express.static(path.join(__dirname, '../static'), { etag: false })
	)
	app.use(
		'/3D-models',
		express.static(path.join(__dirname, '../static/3DModels'), { etag: false })
	)
}
