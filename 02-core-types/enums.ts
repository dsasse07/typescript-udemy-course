/**
 * Enums do not exist by default in JS
 *
 * This provides a way for us to make readable types that
 * replace the implicit types
 *
 * Ex:
 * We can store a users Auth level or role by a number, but that
 * is not readily readable by a user, and with TS it would allow
 * any number to be put in.
 *
 * We want to use specific nums and have them mean specific things.
 */

// By convetions Enums have all uppercase names

// Here each is assigned a numerical value equivalent
// Can only be those values.
enum Role {
  ADMIN = 5, // By Default starts at 0, but new defaults can be set
  READ_ONLY, // With = 5 above, all roles would increment startign there
  AUTHOR,
}

const person2 = {
  name: 'Danny',
  age: 33,
  hobbies: ['Hiking', 'Coding'],
  role: Role.ADMIN, // Returns 0
}

console.log(person2.role)
