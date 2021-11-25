describe('Green field pizza web app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001');
  });

  it('should type an invalid date', () => {
    cy.get('[data-cy-id="button_continuePayment"]').click();
    cy.get('[data-cy-id="input_name"]').type('Carla');
    cy.get('[data-cy-id="input_address"]').type('290 Bremner Blvd');
    cy.getWithinIframe('[name="cardnumber"]').type('4242424242424242');
    cy.getWithinIframe('[name="exp-date"]')
      .type('1970')
      .should(($el) => {
        const className = $el[0].className;
        expect(className).to.be.equals('InputElement is-invalid Input');
      });
  });
});
