/**
 * Typescript uses static types and type checking is done during
 * development and and build time
 *
 * Javscript typeof runs at runtime and is dynamically typed
 */

// Dynamic typing
/*
function basicAdd(n1, n2) {
  if (typeof n1 !== 'number' || typeof n2 !== number){
    throw new Error ('Must input a number')
  }
  return n1 + n2
}
*/

// Static typing
function addTwoNum(n1: number, n2: number) {
  return n1 + n2
}

const num1 = 5
const num2 = 2.8

const result = addTwoNum(num1, num2)
console.log(result)
