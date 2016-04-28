// Formiga Exams
// ------------------------------------------------------------------
// Possible validation error checks. Used by Formiga Doctor.
//
// Exams accept a `formigaInput` object and return a validation error
// object with it's `type` and an optional `info` object.
//
// They return `false` if no error is found.
//

// TODO: make these TODOs issues
// TODO: add a `calculatedValue` function property to the input, that deals with different input types,
// like dates, currency, etc.
// TODO: Remember to check for `badInput` on Doctor
// TODO: Add a `radioValueMissing` translation
// TODO: Should the input type logic be on the `valueMissing` or on the translator? Consider that maybe it's
// only interesting to have custom messages for fields with options, as the current solution.
// TODO: trim input value
// TODO: notInRange error
// TODO: notInLengthRange error
// TODO: notBlank error
// TODO: number of checkboxes errors (ex: at least 3 options)

import invalidError from './support/invalid-error'
import flatten from './support/flatten'

// Methods contracts
// (input{ :constraints, :type, :value, :validity }) -> (invalidError{ :type, :info } || false)
const _public = {
  badInput(input) {
    const errorType = input.type === 'number' ? 'numberTypeMismatch' : 'badInput'
    return input.validity.badInput ? invalidError(errorType) : false
  },

  customError(input) {
    return input.validity.customError ? invalidError('customError') : false
  },

  rangeOverflow(input) {
    const customOverflow = input.calculatedValue() > input.constraints.maxval
    return (input.validity.rangeOverflow || customOverflow) ? invalidError('rangeOverflow') : false
  },

  rangeUnderflow(input) {
    const customUnderflow = input.calculatedValue() < input.constraints.minval
    return (input.validity.rangeUnderflow || customUnderflow) ? invalidError('rangeUnderflow') : false
  },

  stepMismatch(input) {
    return input.validity.stepMismatch ? invalidError('stepMismatch') : false
  },

  // Usually browsers crop text or disable typing instead of triggering this.
  tooLong(input) {
    const customTooLong = input.value.length > input.constraints.maxlength
    return (input.validity.tooLong || customTooLong) ? invalidError('tooLong') : false
  },

  tooShort(input) {
    const customTooShort = input.value.length < input.constraints.minlength
    return (input.validity.tooShort || customTooShort) ? invalidError('tooShort') : false
  },

  valueMissing(input) {
    const errorTypes = {
      checkbox: 'checkboxValueMissing',
      select: 'selectValueMissing',
      radio: 'radioValueMissing',
    }

    const errorType = errorTypes[input.type] || 'valueMissing'

    return input.validity.valueMissing ? invalidError(errorType) : false
  },

  typeMismatch(input) {
    const errorTypes = {
      email: 'emailTypeMismatch',
      number: 'numberTypeMismatch', // I'm not sure if this will ever be fired. Maybe browser dependent.
      url: 'urlTypeMismatch',
    }

    const errorType = errorTypes[input.type] || 'typeMismatch'

    return input.validity.typeMismatch ? invalidError(errorType) : false
  },

  patternMismatch(input) {
    const textareaChecks = [
      this.tooShort(input),
      this.tooLong(input),
    ]

    const errorChecks = [
      input.type === 'url' ? invalidError('urlTypeMismatch') : false,
      textareaChecks,
      invalidError('patternMismatch'),
    ]

    const error = flatten(errorChecks).find(check => check !== false)
    const textareaError = textareaChecks.find(check => check !== false)

    if (input.validity.patternMismatch) { return error }
    if (input.type === 'textarea') { return textareaError || false }
    return false
  },
}

export default _public
