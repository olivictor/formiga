// Formiga Translator
// ------------------------------------------------------------------
// Exams error results translations.
//

import _ from 'lodash'
import { translationNotFound } from './formiga-errors'

const _public = {
  locale: 'pt-BR',

  i18n: {
    'pt-BR': {
      valueMissing: 'Este campo não pode ficar vazio.',
      selectValueMissing: 'Por favor escolha uma das opções.',
      checkboxValueMissing: 'Por favor escolha uma ou mais opções.',
      typeMismatch: 'Parece que há caracteres inválidos neste campo.',
      emailTypeMismatch: 'Este valor precisa ser um email.',
      numberTypeMismatch: 'Este valor precisa ser numérico.',
      urlTypeMismatch: 'Este campo deve ser uma URL válida.',
      patternMismatch: 'Este campo parece estar inválido.',
      currencyPatternMismatch: 'Informe um valor válido com os centavos.',
      tooLong: 'Este campo deve ter menos de ${maxlength} caracteres.',
      tooShort: 'Este campo deve ter mais de ${minlength} caracteres.',
      rangeUnderflow: 'Valor muito baixo.',
      rangeOverflow: 'Valor grande demais.',
      stepMismatch: 'Verifique a precisão do valor inserido.',
      customError: 'Verifique este campo por favor.',
      badInput: 'Verifique o tipo do valor inserido.',
    },
    'en-US': {
      valueMissing: 'This value can not be blank.',
      typeMismatch: 'This value has invalid characters.',
      patternMismatch: 'This value seems to be invalid.',
      tooLong: 'This value is too long.',
      rangeUnderflow: 'This value is too big.',
      rangeOverflow: 'This value is too small.',
      customError: 'Please check this value.',
    },
  },

  init(options) {
    this.locale = options.locale
    this.i18n = options.i18n
    return this
  },

  // Translation support for error objects or simple strings
  translate(error) {
    return error.type !== undefined ? this.translateWithTemplate(error) : this.translateWithString(error)
  },

  translateWithTemplate(error) {
    const translation = _.template(this.i18n[this.locale][error.type])(error.info)

    if (translation === undefined) { throw translationNotFound(error.type) }

    return translation
  },

  translateWithString(error) {
    const translation = this.i18n[this.locale][error]

    if (translation === undefined) { throw translationNotFound(error) }

    return translation
  },
}

export default _public
