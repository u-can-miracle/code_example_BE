import * as aws from 'aws-sdk'
import envs from './envs'

aws.config.update({
	// Your SECRET ACCESS KEY from AWS should go here,
	// Never share it!
	// Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
	secretAccessKey: envs.aws.secretKey,
	// Not working key, Your ACCESS KEY ID from AWS should go here,
	// Never share it!
	// Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
	accessKeyId: envs.aws.accessKey,
	region: 'us-east-2' // region of your bucket
})

const s3 = new aws.S3()

export default s3
