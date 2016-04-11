// Invalid Error
// ------------------------------------------------------------------
// Custom error message with support for dinamic values as parameters.
//

export default function invalidError(type, info) {
  return {
    type: type,
    info: info,
  }
}
