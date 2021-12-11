/* eslint-disable no-unused-vars */
import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      getByLabel(label: string): Chainable<Element>
    }
  }
}