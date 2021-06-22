console.log('Your code goes here...')

// Abtract keyword allows us to use the abstract function keyword
// This also means we cannot directly instantiate a department, it must be extended
abstract class Department {
  /**
   * Don't need these here because we labelled them in the constructor
   * private id: string
   * private name: string
   */

  private employees: string[] = [] // Private is a TS feature than prevents access without setter/getter
  // Alternative is to use 'protected' which will let classes that extend this class
  // access this property

  static fiscalYear = 2021 // Static property callabled by Class.property

  // Public is default behavior, does not need to be declared explicitly
  // Readonly is another TS-only feature that prevents changing of property during dev
  constructor(protected readonly id: string, public name: string) {
    // Automatically creates this.id & this.name
  }

  // describe(this: Department) {
  //   console.log('Department ' + this.name)
  // }

  // Abstract functions show how a function should look when inherited,
  // but relies on the child to implement the code for the function
  // Allow

  abstract describe(this: Department): void

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  // Class method. Holds utility for the class that is independent of instance
  static createEmployee(name: string) {
    return { name }
  }

  printEmployeeInformation() {
    console.log(this.employees.length)
    console.log(this.employees)
  }
}

class ITDepartment extends Department {
  private static instance: ITDepartment
  /**
   * What if we wanted to enforce that there is only ever one instance?
   * (Singleton pattern)
   * We can make the constructor private
   *
   * We then can use a static method to get the existing instance or make a new one
   */
  private constructor(id: string, public admins: string[]) {
    super(id, 'IT')
    this.admins = admins
  }

  static getinstance() {
    if (!this.instance) {
      this.instance = new ITDepartment('1221', ['Joe', 'Fred'])
    }
    return this.instance
  }
  // Must now include a describe function since Department has the abstract describe
  // function
  describe() {
    console.log('Accounting Department ID: ' + this.id)
  }
}

class AccountingDepartment extends Department {
  private lastReport: string

  constructor(id: string, public reports: string[]) {
    super(id, 'Accounting')
    this.lastReport = reports[0]
  }

  addReport(text: string) {
    this.reports.push(text)
    this.lastReport = text
  }

  // Overrides Department describe method
  describe() {
    console.log('Accounting Department ID: ' + this.id)
  }

  // Used to invoke more complex logic when returning a value
  // Accessed like a propert on an instance, not as a function
  // AccountingDepartment.mostRecentReport
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport
    }
    console.log('hmm', this.lastReport)
    throw new Error('No report found')
  }

  // Accessed like a propert on an instance, not as a function
  // AccountingDepartment.mostRecentReport = 'blah'
  set mostRecentReport(text: string) {
    if (!text) throw new Error('Please enter a value')
    this.addReport(text)
  }
}

const it1 = ITDepartment.getinstance()
const ac = new AccountingDepartment('1441', [])
console.log(ac)
