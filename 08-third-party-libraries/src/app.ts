/** Using Javascript libraries with TS
 * Search for the "types" of a library
 * Ex: Lodash -> @types/lodash
 * Can be found in the "DefinitelyTyped GitHub Repo"
 *
 * These typing files are called *.d.ts files
 *
 * TS Docs also have info for how to make your own
 */

import lodash from 'lodash'

console.log(lodash.shuffle([1, 2, 3]))

/**
 * What if the library does not have a @types file?
 *
 * Use the declare command to tell TS we know for sure it exists as devs,
 * even if it canot sort it out on its own
 *
 * LAST RESORT
 */

// declare const GLOBAL: any

/**
 * Class Transformer
 */

import { Product } from './product'

// Received data from a fetch as JSON, but need to covert it
// to class instances

const products = [
  { title: 'A Carpet', price: 29.99 },
  { title: 'A Book', price: 12.99 },
]

// Traditionally we would need to .map and instantiate
const loadedProducts = products.map((p) => new Product(p.title, p.price))
console.log(loadedProducts)
// With class transformer, we ca define a class in TS and use
// a helper method to instantiate classes from JSON

// npm i class-transformer --save
// npm i reflect-metadata --save
import 'reflect-metadata'
import { plainToClass } from 'class-transformer'

const transformedProducts = plainToClass(Product, products)
console.log(transformedProducts)

/**
 * Class Validator
 *
 * npm i class-validator --save
 *
 * Add validators to the model file
 */

import { validate } from 'class-validator'
const newProd = new Product('', -5.99)
validate(newProd).then((errors) => {
  if (errors.length > 0) {
    console.log('Validation Errors!')
    console.table(errors)
  } else {
    console.log('Good!')
  }
})
console.log(newProd.information)
