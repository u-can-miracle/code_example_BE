import langRU from './languages/ru'
import langEN from './languages/en'
import { DEFAULT_LANG } from './getClientLanguage'

const languages = [langRU, langEN]

function getTranslationByLang(langType = DEFAULT_LANG) {
  return languages.find(({ languageName }) => languageName === langType)
}

export default getTranslationByLang
