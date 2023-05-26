import { faker } from '@faker-js/faker'

Cypress.Commands.add('generateUser', () => {
    return {
      'nome':faker.name.fullName(),
      'email':faker.internet.email(),
      'password':'teste',
      'administrador':'false',
    }
})

Cypress.Commands.add('registerUser', () =>{
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