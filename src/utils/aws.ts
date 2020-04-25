// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
import s3 from '../config/aws.connection'
import envs from '../config/envs'

interface IObj {
	Body: Buffer
}

export function getObject(key: string):Promise<IObj> {
	return new Promise((resolve, reject) => {
		const params = {
			Bucket: envs.aws.bucketName,
			Key: key,
		}
		s3.getObject(params, (err, data) => {
			if(err){
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}

interface IUploadData {
	Location: string
	ETag: string
	Bucket: string
	Key: string
}
export function upload(key: string, body: Buffer){
	return new Promise((resolve, reject) => {
		const params = {
			Bucket: envs.aws.bucketName,
			Key: key,
			Body: body,
			ACL: 'public-read',
		}

		s3.upload(params, (err, data: IUploadData) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}
