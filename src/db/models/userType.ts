import UserTypeSchema, { IUserTypeObj } from '../schemas/userType'

export async function findAll(): Promise<IUserTypeObj[]> {
	const userType = await UserTypeSchema.findAll({
		raw: true,
	})

	return userType
}
