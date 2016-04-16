// Formiga Doctor
// ------------------------------------------------------------------
// Checks inputs for errors in order of priority.
//

// TODO: Consider using foreach instead of map or lazy evaluation

const _defaults = {
  // Exams functions ordered by priority
  examsScript: [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooLong',
    'rangeUnderflow',
    'rangeOverflow',
    'stepMismatch',
    'customError',
  ],
}

// Private

function checkScript(script, examsSource) {
  const missingExam = script.find(exam => examsSource[exam] === undefined)
  if (missingExam !== undefined) throw Error(`Formiga exam not found: ${missingExam}`)
  return true
}

// Public

const _public = {
  init(options) {
    this.exams = options.exams
    this.examsScript = options.examsScript || _defaults.examsScript
    checkScript(this.examsScript, this.exams)
    return this
  },

  diagnose(input) {
    return this.examsScript
      .map(examName => this.exams[examName](input))
      .find(result => result !== false)
  },
}

export default _public
