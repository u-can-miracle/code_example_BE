import convertingMessageSchema from '../schemas/convertingMessage'

interface IParams {
	error: string
	warning: string
	modelId: number
}
export async function createOrUpdate(params: IParams) {
	const { modelId, error, warning } = params
	const convertMsg = await convertingMessageSchema.findOne({
		where: { modelId }
	})


	if (convertMsg) {
		await convertingMessageSchema.update(
			{ error, warning },
			{ where: { modelId } },
		)
	} else {
		await convertingMessageSchema.create({
			modelId,
			error,
			warning,
		})
	}
}
