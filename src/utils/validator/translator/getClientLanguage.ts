import * as langParser from 'accept-language-parser'

export const DEFAULT_LANG = 'ru'
export const AVAILABLE_LANGS = ['ru', 'en']

function getClientLanguage(headers = {}) {
  const langs = langParser.parse(headers['accept-language'])
  const code = langs[0] ? langs[0].code : DEFAULT_LANG

  return code
}

export default getClientLanguage
