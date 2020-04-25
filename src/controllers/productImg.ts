import logger from '../config/logger'
import * as productImgModel from '../db/models/productImg'
import { IAsset } from '../interfaces/common'
import { getProduct } from '../controllers/product'
import { IUser } from '../interfaces/user'

interface IReturn {
	code: number
	data?: object
	message?: string
}
export async function getProductImg(user: IUser, id: number):Promise<IReturn> {
  try {
    const { companyId } = user
  	const productImg = await productImgModel.get(id)

  	if(!productImg){
  		return {
  			code: 404,
  		}
  	}

  	if(productImg.product.companyId !== companyId){
  		return {
  			code: 401
  		}
  	}

  	return {
  		code: 200,
  		data: productImg,
  	}
  } catch (err) {
    logger.error({ err })

    return { code: 500 }
  }
}

interface ICreate extends IAsset {
	productId: number
}
export async function createProductImg(user: IUser, params: ICreate):Promise<IReturn> {
  try {
    const { code } = await getProduct(params.productId, user)
    if(code !== 200){
      return { code }
    }

    const productImg = await productImgModel.create(params)

    return {
      code: 200,
      data: productImg,
    }
  } catch (err) {
    logger.error({ err })

    return { code: 500 }
  }
}

interface IUpdate {
	originalname?: string
	mimetype?: string
	location?: string
	key?: string
	productId?: number
}
export async function updateProductImg(
  user: IUser,
  params: IUpdate,
  id: number,
):Promise<IReturn> {
  try {
    const { code } = await getProductImg(user, id)

    if (code !== 200) {
  		return { code }
  	}

  	const [, [productImg]] = await productImgModel.update(params, { id })

  	return {
  		code: 200,
  		data: productImg,
  	}
  } catch (err) {
    logger.error({ err })

    return { code: 500 }
  }
}

export async function deleteProductImg(user: IUser, id: number):Promise<IReturn> {
  try {
    const { code } = await getProductImg(user, id)
  	if(code !== 200){
  		return { code }
  	}

  	await productImgModel.remove(id)

  	return {
  		code: 200,
  		data: { id },
  	}
  } catch (err) {
    logger.error({ err })

    return { code: 500 }
  }
}
