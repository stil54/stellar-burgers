import { SELECTORS } from '../support/selectors';
import { TEXTS } from '../support/texts';

describe('Страница конструктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('добавляет булки и начинки в конструктор', () => {
    // Добавление булки
    cy.addIngredientToConstructor(TEXTS.bunN1);
    cy.get(SELECTORS.burgerConstructor).within(() => {
      cy.contains(TEXTS.bunTop).should('be.visible');
      cy.contains(TEXTS.bunBottom).should('be.visible');
    });

    // Добавление начинки
    cy.addIngredientToConstructor(TEXTS.patty);
    cy.verifyIngredientInConstructor(TEXTS.patty);

    // Добавление соуса
    cy.addIngredientToConstructor(TEXTS.sauceX);
    cy.verifyIngredientInConstructor(TEXTS.sauceX);

    cy.contains('button', TEXTS.placeOrder).should('be.enabled');
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    cy.addIngredientToConstructor(TEXTS.sauceX);

    // Открытие модального окна
    cy.contains('li', TEXTS.sauceX).find('a').click();
    cy.contains('h3', TEXTS.ingredientDetailsTitle).should('be.visible');
    cy.contains('.text_type_main-default', TEXTS.sauceX).should('be.visible');

    // Закрытие кнопкой
    cy.closeModalByButton();
    cy.contains('h3', TEXTS.ingredientDetailsTitle).should('not.exist');

    // Открытие и закрытие оверлеем
    cy.contains('li', TEXTS.sauceX).find('a').click();
    cy.contains('h3', TEXTS.ingredientDetailsTitle).should('be.visible');
    cy.closeModalByOverlay();
    cy.contains('h3', TEXTS.ingredientDetailsTitle).should('not.exist');
  });

  it('создаёт заказ и проверяет очистку конструктора', () => {
    // Моки авторизации и заказа
    cy.loginByFakeTokens();
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');

    // Сборка бургера
    cy.addIngredientToConstructor(TEXTS.bunN1);
    cy.addIngredientToConstructor(TEXTS.patty);

    // Оформление заказа
    cy.contains('button', TEXTS.placeOrder).should('be.enabled').click();
    cy.wait('@createOrder');

    // Проверка модального окна заказа
    cy.contains(TEXTS.orderNumber).should('be.visible');

    // Закрытие модального окна
    cy.closeModalByButton();

    // Проверка очистки конструктора
    cy.contains(TEXTS.bunTop).should('not.exist');
    cy.contains(TEXTS.bunBottom).should('not.exist');
    cy.contains('li', TEXTS.patty).should('not.exist');
    cy.contains('button', TEXTS.placeOrder).should('be.disabled');
  });
});