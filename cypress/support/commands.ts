import { SELECTORS } from './selectors';
import { TEXTS } from './texts';

declare global {
  namespace Cypress {
    interface Chainable {
      loginByFakeTokens(): Chainable<void>;
      addIngredientToConstructor(ingredientName: string): Chainable<void>;
      closeModalByButton(): Chainable<void>;
      closeModalByOverlay(): Chainable<void>;
      verifyIngredientInConstructor(ingredientName: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('loginByFakeTokens', () => {
  window.localStorage.setItem('accessToken', 'fake-access-token');
  window.localStorage.setItem('refreshToken', 'fake-refresh-token');
});

Cypress.Commands.add('addIngredientToConstructor', (ingredientName: string) => {
  cy.contains('li', ingredientName).within(() => {
    cy.contains('button', TEXTS.addButton).click();
  });
});

Cypress.Commands.add('closeModalByButton', () => {
  cy.get(SELECTORS.modalCloseButton).click({ force: true });
});

Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get(SELECTORS.modalOverlay).click({ force: true });
});

Cypress.Commands.add('verifyIngredientInConstructor', (ingredientName: string) => {
  cy.get(SELECTORS.burgerConstructor).within(() => {
    cy.contains('li', ingredientName).should('exist');
  });
});