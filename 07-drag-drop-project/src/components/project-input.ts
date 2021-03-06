import { Component } from './base-component'
import { AutoBindPrj1 } from '../decorators/autobind'
import { projectState } from '../state/project-state'
import * as Validate from '../util/validation'

/**
 *
 * New Project Form
 *
 */

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor() {
    super('project-input', 'app', true, 'user-input')

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement

    this.configure()
  }

  configure() {
    // Attach actions & listeners to forms
    // When a class method is bound to an event listener, 'this' scopes to global window
    // must specifically bind this to the SAME this of the class
    // this.submitHandler.bind(this)
    // Or
    // Use a decorator (@AutoBind) that modifies the property descriptor to have it bound!
    this.element.addEventListener('submit', this.submitHandler)
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value
    const description = this.descriptionInputElement.value
    const people = this.peopleInputElement.value

    const titleValidate: Validate.Validatable = {
      value: title,
      required: true,
    }
    const descriptionValidate: Validate.Validatable = {
      value: description,
      required: true,
      minLength: 5,
    }
    const peopleValidate: Validate.Validatable = {
      value: +people,
      required: true,
      min: 1,
      max: 5,
    }
    // Validate values using decorator!
    if (
      !Validate.validatePrj1(titleValidate) ||
      !Validate.validatePrj1(descriptionValidate) ||
      !Validate.validatePrj1(peopleValidate)
    ) {
      alert('Invalid Input, please try again!')
      return
    } else {
      return [title, description, +people]
    }
  }

  private clearInputs() {
    this.titleInputElement.value = ''
    this.descriptionInputElement.value = ''
    this.peopleInputElement.value = ''
  }

  @AutoBindPrj1
  private submitHandler(event: Event) {
    event.preventDefault()
    const userInput = this.gatherUserInput()
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput
      projectState.addProject(title, description, people)
      this.clearInputs()
    }
  }
}
