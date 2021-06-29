/// <reference path="drag-drop-interfaces.ts" />
/// <reference path="project-model.ts" />
/**
 * Namespace reference above must start with '///'
 * If we then duplicate the namespace here, the code can
 * reference each other across files.
 *
 * The problem is that by default they are still compiled
 * to multiple JS files which dont reference each other.
 * To make this work, we must change 'modules' from 'common'
 * to 'amd' in tsconfig. Must also enable OutFile
 *
 * This will cause all files of the same namespace to be
 * compiled together
 */

namespace App {
  /**
   * Object Oriented Approach (optional)
   * Rendering HTML template tags
   * into the <div id="app"></div>
   */

  function AutoBindPrj1(
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

  interface Validatable {
    value: string | number
    // Make the below properties optional using ?
    required?: boolean
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
  }

  function validatePrj1(input: Validatable): boolean {
    let isValid = true
    if (input.required) {
      isValid = isValid && input.value.toString().trim().length !== 0
    }
    if (input.minLength != null && typeof input.value === 'string') {
      isValid = isValid && input.value.length >= input.minLength
    }
    if (input.maxLength != null && typeof input.value === 'string') {
      isValid = isValid && input.value.length <= input.maxLength
    }
    if (input.min != null && typeof input.value === 'number') {
      isValid = isValid && input.value >= input.min
    }
    if (input.maxLength != null && typeof input.value === 'number') {
      isValid = isValid && input.value <= input.maxLength
    }
    return isValid
  }

  /**
   *
   * ProjectStateManager
   *
   */

  type Listener<T> = (projects: T[]) => void

  class State<T> {
    // Subscription pattern is a series of functions to be called
    // Whenever state is updated
    protected listeners: Listener<T>[] = []

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn)
    }
  }

  class ProjectState extends State<Project> {
    // Singleton pattern
    private projects: Project[] = []
    private static instance: ProjectState
    private constructor() {
      super()
    }

    static getInstance() {
      if (this.instance) {
        return this.instance
      }
      this.instance = new ProjectState()
      return this.instance
    }
    addProject(title: string, description: string, people: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        people,
        ProjectStatus.Active
      )
      this.projects.push(newProject)
      this.updateListeners()
    }

    updateProjectStatus(id: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === id)
      if (project && project.status !== newStatus) {
        project.status = newStatus
        this.updateListeners()
      }
    }

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        // Need a new array, not a references\
        listenerFn(this.projects.slice())
      }
    }
    // Moved to Base Class
    // addListener(listenerFn: Listener) {
    //   this.listeners.push(listenerFn)
    // }
  }

  const projectState = ProjectState.getInstance()

  /**
   *
   * Component (Base Class)
   *  - Abstract class that cannot be directly instatiated
   */

  abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement
    hostElement: T
    element: U

    constructor(
      templateID: string,
      hostElemendId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      // The content template we will render
      this.templateElement = document.getElementById(
        templateID
      )! as HTMLTemplateElement

      // Where I want to put the content
      this.hostElement = document.getElementById(hostElemendId)! as T

      // copies the content of the specified node. Deep copy includes nested children
      const importedNode = document.importNode(
        this.templateElement.content,
        true
      )
      // Content is imported as a Fragment <>
      // Get the inner element, which is the first child of the fragment
      this.element = importedNode.firstElementChild as U
      if (newElementId) {
        // Add styling ID to the new element
        this.element.id = newElementId
      }

      this.attach(insertAtStart)
    }

    abstract configure(): void
    abstract renderContent(): void

    private attach(insertAtStart: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtStart ? 'afterbegin' : 'beforeend',
        this.element
      )
    }
  }

  /**
   *
   * Project Item
   *
   */

  class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project
    get personsText() {
      if (this.project.people === 1) {
        return '1 person'
      } else {
        return `${this.project.people} people`
      }
    }

    constructor(hostId: string, project: Project) {
      super('single-project', hostId, false, project.id)
      this.project = project
      this.configure()
      this.renderContent()
    }

    @AutoBindPrj1
    dragStartHandler(event: DragEvent) {
      // Data we would like to deliver to the target when it is dropped
      // Not all drag events can have data transfer, but drag start does

      // Here we only need id, and we can fetch the project from state later
      event.dataTransfer!.setData('text/plain', this.project.id)
      event.dataTransfer!.effectAllowed = 'move'
    }

    @AutoBindPrj1
    dragEndHandler(event: DragEvent) {}

    configure() {
      // Must also add draggable='true' to the HTML attributes of element
      this.element.addEventListener('dragstart', this.dragStartHandler)
      // this.element.addEventListener('dragend', () => console.log('end'))
    }

    renderContent() {
      this.element.querySelector('h2')!.textContent = this.project.title
      this.element.querySelector('h3')!.textContent =
        this.personsText + ' assigned'
      this.element.querySelector('p')!.textContent = this.project.description
    }
  }

  /**
   *
   * Project List
   *
   */

  class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DropArea
  {
    projectsHeadingElement: HTMLHeadingElement
    projectsListElement: HTMLUListElement
    assignedProjects: Project[]

    constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects`)
      // this.templateElement = document.getElementById(
      //   'project-list'
      // )! as HTMLTemplateElement
      // this.hostElement = document.getElementById('app')! as HTMLDivElement
      // const importedNode = document.importNode(this.templateElement.content, true)
      // this.element = importedNode.firstElementChild as HTMLElement
      this.element.id = `${this.type}-projects`

      this.projectsHeadingElement = this.element.querySelector(
        'h2'
      ) as HTMLHeadingElement
      this.projectsListElement = this.element.querySelector(
        'ul'
      ) as HTMLUListElement

      this.assignedProjects = []

      this.configure()
      this.renderContent()
    }

    @AutoBindPrj1
    dragOverHandler(event: DragEvent) {
      // Only highlight area as a target if it contains the correct data type
      if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault() // Prevents default of not allowing drag/drops
        this.projectsListElement.classList.add('droppable')
      }
    }

    @AutoBindPrj1
    dropHandler(event: DragEvent) {
      const projectId = event.dataTransfer!.getData('text/plain')
      projectState.updateProjectStatus(
        projectId,
        this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
      )
    }

    @AutoBindPrj1
    dragLeaveHandler(event: DragEvent) {
      this.projectsListElement.classList.remove('droppable')
    }

    configure() {
      this.element.addEventListener('dragover', this.dragOverHandler)
      this.element.addEventListener('dragleave', this.dragLeaveHandler)
      this.element.addEventListener('drop', this.dropHandler)

      // Adding a function that listens to the projectState and will be executed
      // When projectState is updated.
      projectState.addListener(this.addProjectItems)
      // Could also use the anonymous function below:
      // projectState.addListener((projects: any[]) => {
      //   this.assignedProjects = projects
      //   this.renderProjects()
      // })
    }

    renderContent() {
      const listId = `${this.type}-projects-list`
      this.projectsListElement.id = listId
      this.projectsHeadingElement.textContent = `${this.type.toUpperCase()} PROJECTS`
    }

    @AutoBindPrj1
    private addProjectItems(projects: Project[]) {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active
        } else {
          return prj.status === ProjectStatus.Finished
        }
      })
      this.assignedProjects = relevantProjects
      this.renderProjects()
    }

    private renderProjects() {
      const listEl = this.projectsListElement
      // Erase current items
      listEl.innerHTML = ''
      // Re-populate with current list items
      for (const prj of this.assignedProjects) {
        new ProjectItem(this.projectsListElement.id, prj)
      }
    }
  }

  /**
   *
   * New Project Form
   *
   */

  class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

      const titleValidate: Validatable = {
        value: title,
        required: true,
      }
      const descriptionValidate: Validatable = {
        value: description,
        required: true,
        minLength: 5,
      }
      const peopleValidate: Validatable = {
        value: +people,
        required: true,
        min: 1,
        max: 5,
      }
      // Validate values using decorator!
      if (
        !validatePrj1(titleValidate) ||
        !validatePrj1(descriptionValidate) ||
        !validatePrj1(peopleValidate)
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

  new ProjectInput()
  new ProjectList('active')
  new ProjectList('finished')
}
