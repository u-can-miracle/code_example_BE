import connection from '../config/rabbit/connection'
import envs from '../config/envs'
import {
	handleConvertorResponse,
	IRabbitModelParams,
	IRabbitConvertorResponse,
} from '../controllers/product'

const {
	rabbitConvertQueue: QUEUE,
	rabbitConvertQueueReply: QUEUE_REPLY,
} = envs

const channelWrapper = connection.createChannel({
	json: true,
	setup: channel => {
		// `channel` here is a regular amqplib `ConfirmChannel`.
		// Note that `this` here is the channelWrapper instance.
		return Promise.all([
			channel.assertQueue(QUEUE, { durable: true }),
			channel.assertQueue(QUEUE_REPLY, { durable: true }),
			channel.prefetch(1),
			channel.consume(QUEUE_REPLY, async respo => {
				const message: string = respo.content.toString()
				const messageJson: IRabbitConvertorResponse = JSON.parse(message)
				// tslint:disable-next-line
				console.log('subscriber: got message', message)

				const result = await handleConvertorResponse(messageJson)

				if(result.code && result.code === 200){
					channelWrapper.ack(respo)
				} else {
					// tslint:disable-next-line
					console.log('subscriber: err', result && result.message)
					channelWrapper.nack(respo)
				}
			}),
		])
	}
})

export const publishToConvertor = (fileData: IRabbitModelParams) => new Promise(
	(resolve, reject) => {
		channelWrapper.sendToQueue(QUEUE,
			{ ...fileData },
			{ replyTo: QUEUE_REPLY },
		)
		.then(resp => {
			// tslint:disable-next-line
			console.log(' [.] Got %d', resp)
			resolve(resp)
		})
		.catch(err => {
			// tslint:disable-next-line
			console.log(' [.] Got err', err)
			reject(err)
		})
	}
)
