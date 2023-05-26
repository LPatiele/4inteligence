context('Login', () => {

  before(() => {
    cy.initOldUser()
  });

  it('Successful login', () => {
    cy.visit('https://front.serverest.dev/login')
    cy.fixture('old_user').then((user) => {
      cy.get('[data-testid="email"]').type(user.email)
      cy.get('[data-testid="senha"]').type(user.password)
    })
    cy.get('[data-testid="entrar"]').click()
    cy.url().should('include', '/home') 
    cy.get('h1').should('contain', 'Fulano da Silva')
  })

  it('Failed login', () => {
    cy.visit('https://front.serverest.dev/login')
    cy.generateUser().then((user) => {
      cy.get('[data-testid="email"]').type(user.email)
      cy.get('[data-testid="senha"]').type(user.password)
    })
    cy.get('[data-testid="entrar"]').click()
    cy.url().should('include', '/login') 
    cy.get('.alert').should('contain', 'Email e/ou senha inválidos')
  })

  it('Logout', () => {
    cy.login()
    cy.visit('https://front.serverest.dev/admin/home')
    cy.get('[data-testid="logout"]').click()
    cy.url().should('include', '/login')  
  })
})