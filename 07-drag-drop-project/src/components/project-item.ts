import { Draggable } from '../models/drag-drop'
import { Component } from './base-component'
import { Project } from '../models/project'
import { AutoBindPrj1 } from '../decorators/autobind'

export class ProjectItem
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
