/* eslint-disable cypress/no-unnecessary-waiting */
describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/'); // redirects to '/login'
    cy.findByRole('textbox', {name: /Usuario/i}).type('guido1', {force: true});
    cy.findByLabelText('Contraseña').type('123456', {force: true});
    cy.findByText('Enviar').click({force: true});
    cy.wait(3000); // if bypassed, redirects to '/' and then to '/login' again
    cy.visit('/');

    // add a task
    cy.findByRole('textbox', {name: /Título/i}).type('guido1', {force: true});
    cy.get('#status').select('FINISHED');
    cy.get('#importance').select('HIGH');
    cy.findByRole('textbox', {name: /Descripción/i}).type('guido1', {force: true});
    cy.findByText('Enviar').click({force: true});

    // modify task
    cy.findAllByRole('button', {name: 'FINISHED'}).first().click({force: true});
    cy.get('#delete').first().click({force: true});
    cy.findAllByRole('button', {name: 'HIGH'}).first().click({force: true});
  });
});
