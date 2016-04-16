import doctor from '../src/formiga-doctor'

describe('formigaDoctor', () => {
  describe('#init', () => {
    it('checks for invalid exams in the exams script', () => {
      const exams = { foo() {} }
      const examsScript = ['foo', 'bar']

      expect(
        () => Object.create(doctor).init({ exams: exams, examsScript: examsScript })
      ).toThrowError()
    })
  })

  describe('#diagnose', () => {
    it('runs the exams in the order of the script', () => {
      const exams = { foo() { return 'fooResult' }, bar() { return 'barResult' } }
      const examsScript = ['bar', 'foo']
      const formigaDoctor = Object.create(doctor).init({ exams: exams, examsScript: examsScript })

      expect(formigaDoctor.diagnose({})).toBe('barResult')
    })
  })
})
