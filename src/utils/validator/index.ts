import * as Joi from 'joi'

import getClientLanguage from './translator/getClientLanguage'
import getTranslationByLang from './translator/getTranslationByLang'

type IReqField = 'body' | 'query' | 'params'

export default function validator(schema, reqField: IReqField = 'body'){
	return (req, res, next) => {
    const lang = getClientLanguage(req.headers)
    const translation = getTranslationByLang(lang)
    const options = {
      language: translation,
    }
		const { error } = Joi.validate(req[reqField], schema, options)

		if(error) {
      const { details: [{ message }] } = error

			next({
				isOk: false,
				isSchemaError: true,
				code: 400,
				data: { message },
			})

			return
		}

		next()
	}
}
