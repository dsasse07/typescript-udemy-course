import { ProjectInput } from './components/project-input'
import { ProjectList } from './components/project-list'

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
 *
 * NAMESPACE REFERENCING DOESNT CATCH MISSING IMPORTS
 * -> use ES6 modules
 * -> change 'modules' to 'es2015'
 * -> remove 'outFile'
 * -> add type='module' to script tag in index.html
 */

/**
 * Object Oriented Approach (optional)
 * Rendering HTML template tags
 * into the <div id="app"></div>
 */
console.log('bye now')
new ProjectInput()
new ProjectList('active')
new ProjectList('finished')
