console.log('Your code goes here...')

/**
 * Decorators are about code for other developers, not
 * to affect end users
 *
 * A Decorator is a function, that is applied to something
 * in a certain way
 */

// Decorators start with uppercase
function Logger(constructor: Function) {
  console.log('Logging....')
  console.log(constructor)
}

@Logger
class Person1 {
  name = 'Danny'

  constructor() {
    console.log('Creating a person...')
  }
}

const danny = new Person1()
console.log(danny)

@DecoratorFactory('Cat Time...')
class Cat {
  name = 'Fifi'
  constructor() {
    console.log('My name is ' + this.name)
  }
}
const fifi = new Cat()
console.log(fifi)

// Decorator Factory

function DecoratorFactory(logString: string) {
  return function (constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

//********************************** */
/**
 * Decorator is a tool exposed to Developers which they could then use
 * to do something with a given class.
 */

function FactoryWithTemplate(
  template: string,
  hookId: string,
  cParams: string | any[]
) {
  return function (constructor: any) {
    const element = document.getElementById(hookId)
    const p = new constructor(...cParams)
    if (element) {
      console.log(p)
      element.innerHTML = template
      element.querySelector('h1')!.textContent = p.text
    }
  }
}

// DECORATORS EXECUTE BOTTOM-UP (Factories execute top-down)
// In this example, template renders before logger message
@Logger
@FactoryWithTemplate('<h1>Test Heading</h1>', 'app', ['Clickbait Title'])
class Heading {
  text: string
  constructor(htmlText: string) {
    this.text = htmlText
  }
}

const heading = new Heading('Clickbait header')

/**
 * Property Decorators
 */

// Property Decorator
function Log(target: any, propertyName: string | Symbol) {
  console.log('Property Decorator')
  console.log(`target`, target)
  console.log(`propertyName`, propertyName)
}

// Accessor decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!')
  console.log(`target`, target)
  console.log(`name`, name)
  console.log(`descriptor`, descriptor)
}

// Method Decorator
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method Decorator')
  console.log(`target`, target)
  console.log(`name`, name)
  console.log(`descriptor`, descriptor)
}

// Parameter Decorator
function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter Decorator')
  console.log(`target`, target)
  console.log(`name`, name)
  console.log(`position`, position)
}

// Here these decorators execute as the class is registered by JS
// Does not wait for instantiation
// Property Decorators execute top-down. Instance decorators before static

class Product {
  @Log // Called on instance property here
  title: string
  private _price: number
  @Log // Called on static property here
  static staticProperty: 'Static Name'

  constructor(t: string, p: number) {
    this.title = t
    this._price = p
  }

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val
    } else {
      throw new Error('Invalid price - Should be greater than 0')
    }
  }

  @Log3
  getPriceWithTax(@Log4 tax: number): number {
    return this._price * (1 + tax)
  }
}

/**
 * Using Decorators to change Classes
 *
 * You can return a NEW constructor function when using a decorator factory!
 *
 * This also means that the decorator will only run when the class is instantiated
 * rather than when it is compiled by JS
 *
 * You could also add return values to accessor & method decorators
 */

function ModifyingFactory(template: string, hookId: string) {
  console.log('Modifying Factory!')
  return function <T extends { new (...args: any[]): { subHeading: string } }>(
    originalConstructor: T
  ) {
    // Adds New Functionality to the original class constructor when using
    // this decorator
    return class extends originalConstructor {
      constructor(...args: any[]) {
        super(...args)
        const el = document.getElementById(hookId)
        if (el) {
          el.innerHTML = template
          el.querySelector('h4')!.textContent = this.subHeading
        }
      }
    }
  }
}

@ModifyingFactory('<h4>blahhh</h4>', 'app2')
class SubHeading {
  subHeading: string
  constructor(htmlText: string) {
    this.subHeading = htmlText
  }
}

const sub = new SubHeading('Did it work?')

function AutoBind(
  _: any, // target
  _2: string, // methodName
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFunction = originalMethod.bind(this)
      return boundFunction
    },
  }
  return adjDescriptor
}

class Printer {
  message = 'This works!'

  @AutoBind
  showMessage() {
    console.log(this.message)
  }
}

const p = new Printer()
const myButton = document.querySelector('button')!
myButton.addEventListener('click', p.showMessage)

/**
 * Decorators for Validation
 */

interface ValidatorConfig {
  // Property is the class name
  [property: string]: {
    [validatableProp: string]: string[] // ['required', 'positive]
  }
}
const registeredValidators: ValidatorConfig = {}

function Complete(target: any, propertyName: string) {
  // Get name of property from its constructor
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [
      ...registeredValidators[target.constructor.name][propertyName],
      'required',
    ],
  }
}
function PositiveNumber(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [
      ...registeredValidators[target.constructor.name][propertyName],
      'positive',
    ],
  }
}

function validate(obj: any) {
  // Looks up the name of the Class
  const objValidatorConfig = registeredValidators[obj.constructor.name]
  if (!objValidatorConfig) return true
  let isValid = true
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop]
        case 'positive':
          isValid = isValid && obj[prop] > 0
      }
    }
  }
  return isValid
}

class Course {
  @Complete
  title: string
  @PositiveNumber
  price: number

  constructor(t: string, p: number) {
    this.title = t
    this.price = p
  }
}

const form = document.querySelector('form')!
function createCourse(e: Event) {
  e.preventDefault()
  const title = (document.querySelector('#title') as HTMLInputElement).value
  const price = +(document.querySelector('#price') as HTMLInputElement).value
  const createdCourse = new Course(title, price)
  if (!validate(createdCourse)) {
    alert('Invalid Course')
    return
  }
  console.log(createdCourse)
}

form.addEventListener('submit', createCourse)
