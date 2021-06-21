/**
 * Specifying return value type
 *
 * With a function, Typescript will implciitly determine what
 * data type your function will return
 *
 * Exception: Void
 * - Means that the function has no return value
 * - Don't use undefined, TS expects that to mean you
 * are returning something, with a value of undefined
 */

const add = (n1: number, n2: number) => {
  return n1 + n2
}

const printResult = (num: number): void => {
  console.log('Result: ' + num)
}

const addAndHandle = (n1: number, n2: number, cb: (b: number) => void) => {
  const result = n1 + n2
  cb(result)
}
// printResult(add(5, 12))

// There is a type for a function, and we can specify the
// number of parameters that assigned function would take
// Useful when saving a function in another name

let combineValues: (a: number, b: number) => number
combineValues = add

console.log(addAndHandle(9, 12, printResult))
