describe('Login no sistema de teste', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
  });

  it('Preencher o formulário de login', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.get('.app_logo').should('contain', 'Swag Labs');
  });
  
});

// Pesquisa de Produtos - no SAUCEDEMO não tem por busca de texto
describe('Pesquisar produtos', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.get('.app_logo').should('contain', 'Swag Labs');
  });

  it('Filtrar por A a Z', () => { 
    cy.get('.active_option').click({ force: true });
    cy.get('.product_sort_container').select('az').should('contain', 'Name (A to Z)');
  });

  it('Filtrar por preço baixo a alto', () => {
    cy.get('.active_option').click({ force: true });
    cy.get('.product_sort_container').select('lohi');
    cy.get('.product_sort_container').should('contain', 'Price (low to high)');
  });

});

//Adição de Produtos ao Carrinho
describe('Adicionar produtos ao carrinho', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.get('.app_logo').should('contain', 'Swag Labs');
  });

  it('Adicionar 1 produto ao carrinho', () => { 
    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('.shopping_cart_badge').should('contain', '1'); // já valida se o produto foi add
  });

  it('Adicionar 2 produtos ao carrinho', () => { 
    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('#add-to-cart-sauce-labs-bike-light').click();
    cy.get('.shopping_cart_badge').should('contain', '2'); // já valida se os produtos foram add

  });
});

// Remover Produto do carrinho 
describe('Remover produto do carrinho', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.get('.app_logo').should('contain', 'Swag Labs');
    cy.get('#add-to-cart-sauce-labs-backpack').click();
  });
  
  it('Remover produto do carrinho', () => { 
    cy.get('#remove-sauce-labs-backpack').click();
    cy.get('.shopping_cart_link').should('be.empty'); // valida se o carrinho está vazio 
  });

});

describe('Validar checkout no carrinho', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.get('.app_logo').should('contain', 'Swag Labs');
    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('.shopping_cart_badge').click();
  });

  it('Preencher formulário de checkout', () => { 
    cy.get('#checkout').click(); 
    cy.get('#first-name').type('Adri');
    cy.get('#last-name').type('com K');
    cy.get('#postal-code').type('1234');
    cy.get('#continue').click();
    cy.get('.title').should('contain', 'Checkout: Overview');
  });

});

// Finalização da Compra
describe('Finalizar compra', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.get('.app_logo').should('contain', 'Swag Labs');
    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('.shopping_cart_badge').click();
    cy.get('#checkout').click(); 
    cy.get('#first-name').type('Adri');
    cy.get('#last-name').type('com K');
    cy.get('#postal-code').type('1234');
    cy.get('#continue').click();
  });

  /*it('Finalizar a compra', () => {
    //cy.get('.summary_info_label summary_total_label').should('contain', 'Total: $32.39');
    cy.get('#finish').click();
    cy.get('.complete-header').should('contain', 'Thank you for your order!');
    cy.get('#back-to-products').click();
    cy.get('.header_secondary_container', '.title').should('contain', 'Products');
  });*/ 

});
