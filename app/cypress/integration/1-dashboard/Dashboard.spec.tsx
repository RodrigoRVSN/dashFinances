/* eslint-disable no-param-reassign */
/// <reference types="cypress" />

export {}

describe(('<Dashboard />'), () => {
  context('Visit Dashboard', () => {
    it('Should visit home page', () => {
      cy.visit('/');
    });

    it('Should submit login', () => {
      cy.getByLabel('E-mail').should('have.value', '').type('bee@gmail.com');
      cy.getByLabel('Senha').should('have.value', '').type('bbbbbb');

      cy.get('button').contains('ENTRAR').click();

      cy.wait(2000)
      cy.url().should('contain', 'dashboard');
    });

  })
})