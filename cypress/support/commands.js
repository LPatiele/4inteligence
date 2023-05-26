import { faker } from '@faker-js/faker'

Cypress.Commands.add('generateUser', () => {
    return {
      'nome':faker.name.fullName(),
      'email':faker.internet.email(),
      'password':'teste',
      'administrador':'false',
    }
})

Cypress.Commands.add('registerUser', () => {
  cy.generateUser().then((user) => {
    cy.request({
      method:'POST',
      url: 'https://serverest.dev/usuarios', 
      body: user,
    }).then((response) => {
      const body = response.body
      const id= body['_id']
      return cy.wrap(id)
    })
  })
})

Cypress.Commands.add('initOldUser', () => {
  cy.fixture('old_user').then(user => {
    cy.request({
      method:'POST',
      url: 'https://serverest.dev/usuarios', 
      body: user,
      failOnStatusCode: false,
      }).then((response) => {
        cy.log('Initialized old user')
    }) 
  })
})

Cypress.Commands.add('login', () => {
  cy.initOldUser()
  cy.visit('https://front.serverest.dev/login')
    cy.fixture('old_user').then((user) => {
      cy.get('[data-testid="email"]').type(user.email)
      cy.get('[data-testid="senha"]').type(user.password)
    })
    cy.get('[data-testid="entrar"]').click()
    cy.url().should('include', '/home') 
    cy.get('h1').should('contain', 'Fulano da Silva')
})