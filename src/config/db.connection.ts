import { Sequelize, Op } from 'sequelize'
import envs from './envs'

const operatorsAliases = {
	$eq: Op.eq,
	$ne: Op.ne,
	$gte: Op.gte,
	$gt: Op.gt,
	$lte: Op.lte,
	$lt: Op.lt,
	$not: Op.not,
	$in: Op.in,
	$notIn: Op.notIn,
	$is: Op.is,
	$like: Op.like,
	$notLike: Op.notLike,
	$iLike: Op.iLike,
	$notILike: Op.notILike,
	$regexp: Op.regexp,
	$notRegexp: Op.notRegexp,
	$iRegexp: Op.iRegexp,
	$notIRegexp: Op.notIRegexp,
	$between: Op.between,
	$notBetween: Op.notBetween,
	$overlap: Op.overlap,
	$contains: Op.contains,
	$contained: Op.contained,
	$adjacent: Op.adjacent,
	$strictLeft: Op.strictLeft,
	$strictRight: Op.strictRight,
	$noExtendRight: Op.noExtendRight,
	$noExtendLeft: Op.noExtendLeft,
	$and: Op.and,
	$or: Op.or,
	$any: Op.any,
	$all: Op.all,
	$col: Op.col
}

const { dbHost, dbPort, dbDatabase, dbUser, dbPass } = envs

const sequelize = new Sequelize(dbDatabase, dbUser, dbPass, {
	dialect: 'postgres',

	// custom host; default: localhost
	host: dbHost,
	// for postgres, you can also specify an absolute path to a directory
	// containing a UNIX socket to connect over
	// host: '/sockets/psql_sockets'.

	// custom port; default: dialect default
	port: dbPort,
	define: {
		underscored: false,
		freezeTableName: false,
		charset: 'utf8',
		timestamps: true
	},
	sync: { force: false },
	operatorsAliases
})

sequelize
	.authenticate()
	.then(() => {
		// tslint:disable-next-line
		console.log('Connection has been established successfully.')
	})
	.catch(err => {
		// tslint:disable-next-line
		console.error('Unable to connect to the database:', err)
	})

export default sequelize
