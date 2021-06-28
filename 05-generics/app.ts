console.log('Your code goes here...')

// const names: Array<string> = []
// or
// const names: string[]
const names = ['Danny', 'Nicole']

// By default, Typescript doesn't know the type of data that
// the GENERIC Promise class will contain
// Indicate the inner data type using <>
// Telling TS that its a string will allow us to use
// String methods on the data
const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve('All Done')
  }, 2000)
})

promise.then((data) => console.log(data.split('')))

// Custom generics
/**
 *  Define Custom Type with single Capital Letter
 *  TS creates an intersection type for the output
 *
 * Here we use two different capital letters to show that we have
 * Two DIFFERENT objects, but we don't know what they will contain
 *
 * Long approach that would also work:
 * merge<{name: string}, {age: number}>({ name: 'Danny' }, { age: 33 })
 *
 * Would be safer to say that these would themselves be a specific
 * type (object). We do that with the extends keyword
 */

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB)
}
const merged = merge({ name: 'Danny' }, { age: 33 })

// This would no longer work bc we constrained U
// const merged = merge({ name: 'Danny' }, 33)
// Without constraint it woudl throw a silent error

merged.name // Can now be called without error

// Here we extend a specific property with a generic type
// This way we can specify that the parameter must have that property
// But the data type itself is not important
interface Lengthy {
  length: number
}

function countAndPrint<T extends Lengthy>(element: T) {
  let descriptionText = 'No Value'
  if (element.length > 0) {
    descriptionText = element.length + ' elements long'
  }
  return [element, descriptionText]
}

// Keyword: keyOf can be used to indicate that a generic type
// is a key in an object

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return 'Value: ' + obj[key]
}

// Error bc 'name' is not a key in the obj: extractAndConvert({}, 'name')
extractAndConvert({ name: 'Danny' }, 'name')

// Class Example
/**
 * Errors apparent without indicating what typ eof data 'item' is
 *
 * We want to make sure it is either string, number, or obj
 * But we dont care which.
 */

class DataStorage<T extends string | number | boolean> {
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }
  removeItem(item: T) {
    // Not good for objects / arrays
    this.data.splice(this.data.indexOf(item), 1)
  }
  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()
// textStorage.addItem(2)  Error
textStorage.addItem('bob')
const numberStorage = new DataStorage<number>()
numberStorage.addItem(2)
// numberStorage.addItem('bob') Error
const eitherStorage = new DataStorage<number | string>()
eitherStorage.addItem(2)
eitherStorage.addItem('bob')

// const objStorage = new DataStorage<string[]>()  Error because not within constraint
