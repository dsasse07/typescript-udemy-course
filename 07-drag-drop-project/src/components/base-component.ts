namespace App {
  /**
   *
   * Component (Base Class)
   *  - Abstract class that cannot be directly instatiated
   */

  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
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
}
