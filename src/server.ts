import './config/db.connection'  // just for launching db
import './config/aws.connection'  // just for launching aws
import './config/rabbit/connection'  // just for launching RabbitMQ
import * as express from 'express'

import appConfig from './config/app.config'
import envs from './config/envs'
import logger from './config/logger'
import getApiRouter from './routes'

const app = express()
const { serverPort } = envs
const apiRouter = getApiRouter()

appConfig(app)

app.use('/api', apiRouter)

app.use((err, req, res, next) => {
	logger.error({ req, res, err })

	res.status(500).send(err.message)
})

process.on('uncaughtException', (err) => {
	logger.error({ err })
})

app.listen(serverPort, () => {
	// tslint:disable-next-line
	console.log(`Listening at port: ${serverPort}`)
})
