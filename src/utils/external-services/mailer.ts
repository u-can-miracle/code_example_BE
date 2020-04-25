// import * as nodemailer from 'nodemailer'
import * as sgMail from '@sendgrid/mail'
import envs from '../../config/envs'

const {
	isDev,
	webProtocol,
	webHost,
	webPort,
	emailer: {
		user,
	},
	emailerApiKey
} = envs

function preppendUrl(location: string): string{
	const port = isDev ? `:${webPort}` : ''
	const link = `${webProtocol}://${webHost}${port}${location}`

	return link
}

sgMail.setApiKey(emailerApiKey)

export async function registrationConfirm(email: string, hash: string){
	const link = preppendUrl(`/dashboard/confirm/${hash}`)

	const msg = {
		to: email,
		from: user,
		subject: 'Hello from Appearance ✔',
		// text: 'and easy to do anywhere, even with Node.js',
		// tslint:disable-next-line
		html: `<p>You just registered at Appearance - ${webHost} please confirm your email by opening <a href="${link}">this link</a></p>`,
	}

	const result = await sgMail.send(msg)

	return result
}

export async function changePassword(email: string, hashedPassword: string){
	const link = preppendUrl(`/dashboard/set-password/${hashedPassword}`)
	const msg = {
		to: email,
		from: user,
		subject: 'Hello from Appearance ✔',
		// text: 'and easy to do anywhere, even with Node.js',
		// tslint:disable-next-line
		html: `<p>You have requested changing password at Appearance - ${webHost} click on link to <a href="${link}">set new password</a></p>`,
	}

	const result = await sgMail.send(msg)

	return result
}

export async function inviteMemberToCompany(email: string, hashedEmail: string){
  const link = preppendUrl(`/dashboard/registration/${hashedEmail}`)
  const msg = {
    to: email,
    from: user,
    subject: 'Hello from Appearance ✔',
    // text: 'and easy to do anywhere, even with Node.js',
    // tslint:disable-next-line
    html: `<p>You have been invited to company, click on the link to <a href="${link}">create account</a></p>`,
  }

  const result = await sgMail.send(msg)

  return result
}

export async function inviteExistedMemberToCompany(email: string){
  const link = preppendUrl(`/dashboard/categories`)
  const msg = {
    to: email,
    from: user,
    subject: 'Hello from Appearance ✔',
    // text: 'and easy to do anywhere, even with Node.js',
    // tslint:disable-next-line
    html: `<p>You have been invited to company, click on the link to <a href="${link}">collaborate together</a></p>`,
  }

  const result = await sgMail.send(msg)

  return result
}
