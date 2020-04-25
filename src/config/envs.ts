export default {
	isDev: process.env.NODE_ENV === 'development',
	serverHost: process.env.SERVER_HOST,
	serverPort: process.env.SERVER_PORT,
	webProtocol: process.env.WEB_PROTOCOL,
	webHost: process.env.WEB_HOST,
	webPort: process.env.WEB_PORT,
	dbHost: process.env.DB_HOST,
	dbPort: Number(process.env.DB_PORT),
	dbDatabase: process.env.DB_DATABASE,
	dbUser: process.env.DB_USER,
	dbPass: process.env.DB_PASS,
	secretToken: process.env.TOKEN_SECRET,
	secretCookie: process.env.COOKIE_SECRET,
	encryptAlgorithm: process.env.ENCRYPT_ALGORITHM,
	encryptPwd: process.env.ENCRYPT_PWD,
	aws: {
		bucketName: process.env.AWS_BUCKET_NAME,
		accessKey: process.env.AWS_ACCESS_KEY,
		secretKey: process.env.AWS_SECRET_KEY,
		bucketUrl: process.env.AWS_BUCKET_URL,
	},
	emailer: {
		user: process.env.EMAILER_USER,
		pass: process.env.EMAILER_PASS,
	},
	emailerApiKey: process.env.SENDGRID_API_KEY,
	// rabbit
	rabbitHost: process.env.RABBIT_HOST,
	rabbitPort: Number(process.env.RABBIT_PORT),
	rabbitUser: process.env.RABBIT_USER,
	rabbitPassword: process.env.RABBIT_PASSWORD,
	rabbitConvertExchange: process.env.RABBIT_CONVERT_EXCHANGE,
	rabbitConvertQueue: process.env.RABBIT_CONVERT_QUEUE,
	rabbitConvertQueueReply: process.env.RABBIT_CONVERT_QUEUE_REPLY,
	androidUserAgent: process.env.ANDROID_USER_AGENT,
  // stripe
  stripe: {
    pubKey: process.env.STRIPE_PUB_KEY,
    secKey: process.env.STRIPE_SECRET_KEY,
  }
}
