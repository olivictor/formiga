// Flatten
// ------------------------------------------------------------------
// Flattens array one level deep
//

export default function flatten(array) {
  return Array.prototype.concat.apply([], array)
}
