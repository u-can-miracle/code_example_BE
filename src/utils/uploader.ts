import * as multer from 'multer'
import * as multerS3 from 'multer-s3'
import s3 from '../config/aws.connection'
import envs from '../config/envs'
import { getJwt } from './jwt'

const uploader = multer({
	storage: multerS3({
		s3,
		bucket: envs.aws.bucketName,
		acl: 'public-read',
		metadata: (req, file, cb) => {
			cb(null, {
				fieldName: file.fieldname,
				originalname: file.originalname,
				mimetype: file.mimetype,
				encoding: file.encoding,
			})
		},
		key: async (req, file, cb) => {
			const token = await getJwt(req)
			const { user: { id: userId } } = token
			const newFileName = Date.now() + '-' + file.originalname
			const fullPath = `${userId}/${newFileName}`
			cb(null, fullPath)
		}
	})
})

export default uploader
// String url = "https://s3.us-east-2.amazonaws.com/aws.bucket.name.nick/1/1564059780006-willisau_vulcano_obj.sfb";
