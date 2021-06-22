/**
 * Interfaces
 *
 * Describe the structure of an object
 * - Like custom type
 * - Different from a custom type in that interfaces:
 *  - Can only be used for objects (type is more flexible)
 *  - Interfaces can be used as a contract for a Class
 */

interface Named {
  // Readonly means that all objects that use this interface
  // Must have a readonly attribute
  readonly name?: string

  // What if I want this property to be optional.
  // It might exist, but it doesnt have to.
  // Option 1:
  outputName?: string

  // Option 2:
  // optional => myMethod?(){}
}

// Any object with a name and a greet function is considered
// greetable
// - Interfaces an also inherit
// - Can multiple inherit, spaced by commas
interface Greetable extends Named {
  greet(phrase: string): void
}

// Function Interface
interface AddFn {
  (a: number, b: number): number
}
let addFn: AddFn
addFn = (n1, n2) => {
  return n1 + n2
}

// We import the typing from Greetable using implements
// It is possible to implement multiple interfaces

class Person implements Greetable, Named {
  name?: string
  age: number = 30
  constructor(name?: string) {
    // We made name and optional property
    if (name) this.name = name
  }
  greet(phrase: string): void {
    if (this.name) {
      console.log(phrase, ' ', this.name)
    } else {
      console.log('Hi')
    }
  }
}

let user1: Greetable

user1 = new Person()
// Cannot reassign name since interface says read-only
// user1.name = 'banana'

console.log(user1)
