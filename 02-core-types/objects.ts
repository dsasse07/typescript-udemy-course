// Could use person: object, but it does not let us
// Put any information about the kv pairs

/**
 * instead of setting type to 'object', you could explicity
 * write it like this, but it can implcitly do this as well.
 *
 * Doign it explicitly will enfornce presences of keys
 */

// const person: {
//   name: string
//   age: number
// } = {
//   name: 'Danny',
//   age: 33,
// }

const person = {
  name: 'Danny',
  age: 33,
  hobbies: ['Hiking', 'Coding'],
}

/**
 * Arrays!
 *
 * Array of strings: string[]
 * Array of number: number[]
 * Mixed: (number | string)[]
 */
console.log(person.name)
