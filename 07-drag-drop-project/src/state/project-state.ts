namespace App {
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

  export class ProjectState extends State<Project> {
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

  export const projectState = ProjectState.getInstance()
}
