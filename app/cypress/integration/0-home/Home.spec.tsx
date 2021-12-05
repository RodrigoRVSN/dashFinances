/// <reference types="cypress" />

describe(('<Home />'), () => {
  context('Visit home', () => {
    it('Should visit home page', () => {
      cy.visit('/');
    });

    it('Should contain title', () => {
      cy.get('button').contains('Entrar').should('have.css', 'background-color', "rgb(13, 19, 33)");
      cy.get('button').contains('Registrar').should('have.css', 'background-color', "rgb(18, 18, 20)");

      cy.get('button').contains('Registrar').click();

      cy.get('button').contains('Entrar').should('have.css', 'background-color', "rgb(18, 18, 20)");
      cy.get('button').contains('Registrar').should('have.css', 'background-color', "rgb(13, 19, 33)");
    })

    it('Should redirect to home trying to go to the dashboard without login', () => {
      cy.visit('/dashboard');
    });

    it('Should register new user', () => {
      cy.get('button').contains('Registrar').click();

      cy.getByLabel('Nome').should('have.value', '').type('Bumblebee');
      cy.getByLabel('E-mail').should('have.value', '').type('bee@gmail.com');
      cy.getByLabel('Senha').should('have.value', '').type('bbbbbb');
      cy.get('button').contains('REGISTRAR').click();
      cy.wait(2000)
    })

    it('Should submit login', () => {
      cy.get('button').contains('Entrar').click({ force: true });

      cy.get('button').contains('ENTRAR').should('be.disabled');

      cy.getByLabel('E-mail').should('have.value', '').type('bee@gmail.com');
      cy.getByLabel('Senha').should('have.value', '').type('bbbbbb');

      cy.get('button').contains('ENTRAR').click();
      cy.url().should('contain', 'dashboard');
    });
  })
})