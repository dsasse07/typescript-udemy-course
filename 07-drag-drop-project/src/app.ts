/// <reference path="models/drag-drop.ts" />
/// <reference path="models/project.ts" />
/// <reference path="state/project-state.ts" />
/// <reference path="util/validation.ts" />
/// <reference path="decorators/autobind.ts" />
/// <reference path="components/base-component.ts" />
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-item.ts" />
/// <reference path="components/project-list.ts" />
/**
 * Namespace reference above must start with '///'
 * If we then duplicate the namespace here, the code can
 * reference each other across files.
 *
 * The problem is that by default they are still compiled
 * to multiple JS files which dont reference each other.
 * To make this work, we must change 'modules' from 'common'
 * to 'amd' in tsconfig. Must also enable OutFile to bundle
 * the code to. Ex: ./dist/bundle.js
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

  new ProjectInput()
  new ProjectList('active')
  new ProjectList('finished')
}
