import exams from '../src/formiga-exams'
import invalidError from '../src/support/invalid-error'

// TODO: use a formigaInput factory instead of building a custom input on each test

describe('formigaExams', () => {
  describe('#badInput', () => {
    it('diagnoses "numberTypeMismatch" when input value could not be parsed and is a number', () => {
      const input = { validity: { badInput: false }, type: 'number' }

      expect(exams.badInput(input)).toBe(false)

      input.validity.badInput = true

      expect(exams.badInput(input)).toEqual(invalidError('numberTypeMismatch'))
    })

    it('diagnoses "badInput" when input value could not be parsed and is not a number', () => {
      const input = { validity: { badInput: false } }

      expect(exams.badInput(input)).toBe(false)

      input.validity.badInput = true

      expect(exams.badInput(input)).toEqual(invalidError('badInput'))
    })
  })

  describe('#customError', () => {
    it('diagnoses "customError" when probably some external javascript set it', () => {
      const input = { validity: { customError: false } }

      expect(exams.customError(input)).toBe(false)

      input.validity.customError = true

      expect(exams.customError(input)).toEqual(invalidError('customError'))
    })
  })

  describe('#patternMismatch', () => {
    let input = {}

    beforeEach(() => {
      input = { 
        validity: { 
          patternMismatch: true,
          tooLong: false,
        }, 
        constraints: { 
          minlength: 0,
          maxlength: 0,
        },
        type: 'text',
        value: '',
      }
    })

    it('diagnoses "urlTypeMismatch" when there is a patternMismatch for an url field', () => {
      input.type = 'url'

      expect(exams.patternMismatch(input)).toEqual(invalidError('urlTypeMismatch'))

      input.type = 'text'
    })

    it('checks "tooShort" and "tooLong" errors', () => {
      spyOn(exams, 'tooShort')
      spyOn(exams, 'tooLong')

      exams.patternMismatch(input)

      expect(exams.tooLong).toHaveBeenCalled()
      expect(exams.tooShort).toHaveBeenCalled()
    })

    it('diagnoses "patternMismatch" for other pattern errors', () => {
      expect(exams.patternMismatch(input)).toEqual(invalidError('patternMismatch'))
    })

    it('it always checks "patternMismatch" for textarea', () => {
      // `textarea` doesn't trigger `patternMismatch`
      input.validity.patternMismatch = false
      input.constraints.maxlength = 2
      input.value = 'foo'
      input.type = 'textarea'

      expect(exams.patternMismatch(input)).toEqual(invalidError('tooLong'))

      input.type = 'text'
    })
  })

  describe('#rangeOverflow', () => {
    let input = {}

    beforeEach(() => {
      input = { 
        validity: { rangeOverflow: false }, 
        constraints: {}, 
        calculatedValue() {},
      }
    })

    it('diagnoses "rangeOverflow" when the value is above `max` attribute and field type ' +
       'is `number` or `date.', () => {
      expect(exams.rangeOverflow(input)).toBe(false)

      input.validity.rangeOverflow = true

      expect(exams.rangeOverflow(input)).toEqual(invalidError('rangeOverflow'))
    })

    it('diagnoses "rangeOverflow" when calculated input value is larger than its maxval constraint', () => {
      input.constraints.maxval = '1.0'
      input.calculatedValue = () => '1.0'

      expect(exams.rangeOverflow(input)).toBe(false)

      input.calculatedValue = () => '1.5'

      expect(exams.rangeOverflow(input)).toEqual(invalidError('rangeOverflow'))
    })
  })

  describe('#rangeUnderflow', () => {
    let input = {}

    beforeEach(() => {
      input = { 
        validity: { rangeUnderflow: false }, 
        constraints: {}, 
        calculatedValue() {},
      }
    })

    it('diagnoses "rangeUnderflow" when the value is below `min` attribute and field type ' +
       'is `number` or `date.', () => {
      expect(exams.rangeUnderflow(input)).toBe(false)

      input.validity.rangeUnderflow = true

      expect(exams.rangeUnderflow(input)).toEqual(invalidError('rangeUnderflow'))
    })

    it('diagnoses "rangeUnderflow" when calculated input value is smaller than its minval constraint', () => {
      input.constraints.minval = '1.0'
      input.calculatedValue = () => '1.0'

      expect(exams.rangeUnderflow(input)).toBe(false)

      input.calculatedValue = () => '0.5'

      expect(exams.rangeUnderflow(input)).toEqual(invalidError('rangeUnderflow'))
    })
  })

  describe('#stepMismatch', () => {
    it('diagnoses "stepMismatch" when value is not multiple of the field `step` attribute', () => {
      const input = { validity: { stepMismatch: false } }

      expect(exams.stepMismatch(input)).toBe(false)

      input.validity.stepMismatch = true

      expect(exams.stepMismatch(input)).toEqual(invalidError('stepMismatch'))
    })
  })

  describe('#tooLong', () => {
    let input = {}

    beforeEach(() => {
      input = { 
        validity: { tooLong: false }, 
        constraints: {},
        value: '',
      }
    })

    it('diagnoses "tooLong" when input value is longer than maxlength attribute', () => {
      expect(exams.tooLong(input)).toBe(false)

      input.validity.tooLong = true

      expect(exams.tooLong(input)).toEqual(invalidError('tooLong'))

      input.validity.tooLong = false
    })

    it('diagnoses "tooLong" when input value is longer than maxlength constraint', () => {
      expect(exams.tooLong(input)).toBe(false)

      input.constraints.maxlength = 2
      input.value = 'foo'

      expect(exams.tooLong(input)).toEqual(invalidError('tooLong'))
    })
  })

  describe('#tooShort', () => {
    let input = {}

    beforeEach(() => {
      input = { 
        validity: { tooShort: false }, 
        constraints: {},
        value: '',
      }
    })

    it('diagnoses "tooShort" when input value is longer than minlength attribute', () => {
      expect(exams.tooShort(input)).toBe(false)

      input.validity.tooShort = true

      expect(exams.tooShort(input)).toEqual(invalidError('tooShort'))

      input.validity.tooShort = false
    })

    it('diagnoses "tooShort" when input value is shorter than minlength constraint', () => {
      expect(exams.tooShort(input)).toBe(false)

      input.constraints.minlength = 4
      input.value = 'foo'

      expect(exams.tooShort(input)).toEqual(invalidError('tooShort'))
    })
  })

  describe('#typeMismatch', () => {
    it('diagnoses "typeMismatch" specifying error depending on input type', () => {
      const input = { validity: { typeMismatch: false }, type: 'text' }

      expect(exams.typeMismatch(input)).toBe(false)

      input.validity.typeMismatch = true

      expect(exams.typeMismatch(input)).toEqual(invalidError('typeMismatch'))

      input.type = 'email'

      expect(exams.typeMismatch(input)).toEqual(invalidError('emailTypeMismatch'))

      input.type = 'number'

      expect(exams.typeMismatch(input)).toEqual(invalidError('numberTypeMismatch'))

      input.type = 'url'

      expect(exams.typeMismatch(input)).toEqual(invalidError('urlTypeMismatch'))
    })
  })

  describe('#valueMissing', () => {
    it('diagnoses "valueMissing" specifying error depending on input type', () => {
      const input = { validity: { valueMissing: false }, type: 'text' }

      expect(exams.valueMissing(input)).toBe(false)

      input.validity.valueMissing = true

      expect(exams.valueMissing(input)).toEqual(invalidError('valueMissing'))

      input.type = 'checkbox'

      expect(exams.valueMissing(input)).toEqual(invalidError('checkboxValueMissing'))

      input.type = 'select'

      expect(exams.valueMissing(input)).toEqual(invalidError('selectValueMissing'))

      input.type = 'radio'

      expect(exams.valueMissing(input)).toEqual(invalidError('radioValueMissing'))
    })
  })
})
