import { IProduct, IProductWeb, IProductMobile } from '../interfaces/product'
import { getJwt } from './jwt'
import envs from '../config/envs'

const { androidUserAgent } = envs

export function formatProductsToWebApp(products: IProduct[]): IProductWeb[] {
	return products.map(product => {
		const prodWeb = {
			id: product.id,
			name: product.name,
			description: product.description,
			categoryId: product.categoryId,
			height: product.height,
			width: product.width,
			depth: product.depth,
			companyId: product.companyId,
			userId: product.userId,
			isActive: product.isActive,
			images: product.images,
		}

		return prodWeb
	})
}


function formatToMobileProducts(prods: IProduct[]): IProductMobile[] {
	return prods.map(prod => {
		const prodMobile = {
			id: prod.id,
			name: prod.name,
			description: prod.description,
			categoryId: prod.categoryId,
			categoryName: prod.category.name,
			height: prod.height,
			width: prod.width,
			depth: prod.depth,
			companyId: prod.companyId,
			userId: prod.userId,
			isActive: prod.isActive,
			images: prod.images.map(({ location }) => location)
		}

		return prodMobile
	})
}

type IMobileFormatter = (prods: IProduct[]) => IProductMobile[]
type IWebFormatter = (prods: IProduct[]) => IProductWeb[]

export async function getProdFormatter(req): Promise<IMobileFormatter | IWebFormatter> {
	const { userAgent } = await getJwt(req)
	const isMobileApp = userAgent.includes(androidUserAgent)
	const prodFormatter = isMobileApp ? formatToMobileProducts : formatProductsToWebApp

	return prodFormatter
}
