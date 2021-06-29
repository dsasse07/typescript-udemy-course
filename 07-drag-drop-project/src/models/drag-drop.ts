namespace App {
  /**
   * Drag & Drop functionality requirements
   */

  export interface Draggable {
    dragStartHandler(event: DragEvent): void
    dragEndHandler(event: DragEvent): void
  }

  export interface DropArea {
    // Permits drop by ID'ing valid target
    dragOverHandler(event: DragEvent): void
    // handles the actual drop (update data & UI)
    dropHandler(event: DragEvent): void
    // provide visual feedback, or revert action if canceled
    dragLeaveHandler(event: DragEvent): void
  }
}
