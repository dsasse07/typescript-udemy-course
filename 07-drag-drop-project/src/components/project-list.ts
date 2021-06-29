/// <reference path="base-component.ts" />

namespace App {
  /**
   *
   * Project List
   *
   */

  export class ProjectList
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
}
