describe('Green field pizza web app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001');
  });

  it('should add one product in the basket', () => {
    cy.get('[data-cy-id="pepperoni"]').click();
    cy.get('[data-cy-id="onions"]').click();
    cy.get('div.mt-6 > .max-w-sm').click();
    cy.get('[data-cy-id="text_pizzaUnits"]').should('contain', '1');
  });

  it('should add 2 or more products in the basket', () => {
    cy.get('[data-cy-id="pepperoni"]').click();
    cy.get('[data-cy-id="onions"]').click();

    const numberOfClicks = 5;
    for (let n = 0; n < numberOfClicks; n++) {
      cy.get('div.mt-6 > .max-w-sm').click();
    }
    cy.get('div.mt-6 > .heading-3').should('contain', '14.99');
    cy.get('[data-cy-id="text_pizzaUnits"]').should('contain', numberOfClicks);
  });
});
