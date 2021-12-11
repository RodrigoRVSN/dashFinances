import './index';

export { }

Cypress.Commands.add('getByLabel', (label: string): any => {
  // you can disable individual command logging
  // by passing {log: false} option
  cy.log('**getByLabel**')
  cy.contains('label', label)
    .invoke('attr', 'for')
    .then((id) => {
      cy.get(`#${id}`)
    })
})