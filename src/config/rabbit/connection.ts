import amqp from 'amqp-connection-manager'

import envs from '../envs'

const {
	rabbitHost,
	rabbitUser,
	rabbitPassword,
} = envs

const connection = amqp.connect([rabbitHost], {
	connectionOptions: {
		username: rabbitUser,
		password: rabbitPassword,
	}
})

connection.on('connect', () => {
	// tslint:disable-next-line
	console.log('Connected!')
})
connection.on('disconnect', err => {
	// tslint:disable-next-line
	console.log('Disconnected.', err)
})

export default connection
