/**
 * Union operator | allows us to specify more than one possible
 * data type
 *
 * When specifying multiple types, you may need extra logic
 * in the function to address both types
 */

/**
 * Custom times
 * - Often useable for defining union types
 * - Can be used to give easily understood names to different
 * setups and give a single source of truth
 */

enum Role {
  SUPER,
  MIDDLE,
  BASIC,
}
type Combinable = number | string
type User = {
  name: string
  age: number
  hobbies: string[]
  role: Role
}

const newUser: User = {
  name: 'Joe',
  age: 20,
  hobbies: ['None'],
  role: Role.MIDDLE,
}

const combine = (
  input1: Combinable,
  input2: Combinable,
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

const combinedNames = combine(newUser.name, newUser.hobbies[1], 'as-text')
console.log(combinedNames)
