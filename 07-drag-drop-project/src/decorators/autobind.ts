namespace App {
  export function AutoBindPrj1(
    _: any, // target not used
    _2: string, // methodName not used
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value
    const adjustedDescription: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFunction = originalMethod.bind(this)
        return boundFunction
      },
    }
    return adjustedDescription
  }
}
