/**
 * Union operator | allows us to specify more than one possible
 * data type
 *
 * When specifying multiple types, you may need extra logic
 * in the function to address both types
 */
const combine = (
  input1: number | string,
  input2: number | string,
  resultType: 'as-number' | 'as-text' // Must be one of these two specific values
) => {
  let result
  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultType === 'as-number'
  ) {
    result = +input1 + +input2
  } else {
    result = input1.toString() + input2.toString()
  }
  return result
}

const combinedAges = combine(20, 30, 'as-number')
console.log(combinedAges)

const combinedNames = combine('Danny', 'S', 'as-text')
console.log(combinedNames)
