/**
 * Tuples are fixed length and type arrays
 * Ex:
 * This tuple can only be 2 items long and must always have
 * a number, string pattern
 * [rank, role]
 * [2, 'author']
 *
 * Javscript does not have a default way to enfore this!
 *
 * We create a tuple by writing the type as an array
 * with the elemnts being the types
 *
 * This will check to ensure that the format of the tuple
 * only has a set length and types.
 */

const person1: {
  name: string
  age: number
  hobbies: string[]
  role: [number, string]
} = {
  name: 'Danny',
  age: 33,
  hobbies: ['Hiking', 'Coding'],
  role: [2, 'Engineer'],
}

console.log(person1.name)
