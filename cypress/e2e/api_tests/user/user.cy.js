
context('Manage users', () => {
  
  before(() => {
    cy.initOldUser()
  });
 
  it('Get users', () => {
    cy.request('GET','https://serverest.dev/usuarios').then((response) => {
      expect(response.body).to.be.not.empty  
      expect(response.status).to.eq(200) 
    })  
  })

  it('Criate user successfully', () => {
    cy.generateUser().then((user) => {
      cy.request({
        method:'POST',
        url: 'https://serverest.dev/usuarios', 
        body: user
        }).then((response) => {
          expect(response.body).property('message').to.contain('Cadastro realizado com sucesso')
          expect(response.status).to.eq(201)
      }) 
    })
  })

  it('Criate user unsuccessful',() => {
    cy.fixture('old_user').then(user => {
      cy.request({
        method:'POST',
        url: 'https://serverest.dev/usuarios', 
        body: user,
        failOnStatusCode: false,
        }).then((response) => {
          expect(response.body).property('message').to.contain('Este email já está sendo usado')
          expect(response.status).to.eq(400)
      }) 
    })
  })

  it('Get user successfully', () => {
    cy.registerUser().then((id) => {
      cy.request('GET', 'https://serverest.dev/usuarios/'+id).then((response) => {
        expect(response.body).property('_id').to.eq(id)
        expect(response.status).to.eq(200)
      })
    })
  })

  it('Get user unsuccessful', () => {
    const id = '0uxuPY0cbmQhpE2'
    cy.request({
      method:'GET', 
      url: 'https://serverest.dev/usuarios/'+id, 
      failOnStatusCode: false
    }).then((response) => {
      expect(response.body).property('message').to.contain('Usuário não encontrado')
      expect(response.status).to.eq(400)
    })
  })

  it('Delete user successfully', () => {
    cy.registerUser().then((id) => {
      cy.request({
        method: 'DELETE',
        url: 'https://serverest.dev/usuarios/'+id, 
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).property('message').to.contain('Registro excluído com sucesso')
      })

      cy.request({
        method: 'DELETE',
        url: 'https://serverest.dev/usuarios/'+id, 
      }).then((response) => {
        expect(response.body).property('message').to.contain('Nenhum registro excluído')
        expect(response.status).to.eq(200)
      })
    })
  })

  it('Delete user unsuccessful', () => {
    const id = 'oUb7aGkMtSEPf6BZ'// Usuário com carrinho cadastrado
    cy.request({
      method: 'DELETE',
      url: 'https://serverest.dev/usuarios/'+id, 
      failOnStatusCode: false
    }).then((response) => {
      expect(response.body).property('message').to.contain('Não é permitido excluir usuário com carrinho cadastrado')
      expect(response.status).to.eq(400)
    })
  })

  it('Update user successfully', () => {
    cy.registerUser().then((id) => {
      cy.generateUser().then((user) => {
        cy.request({
          method: 'PUT',
          url: 'https://serverest.dev/usuarios/'+id,
          body: user
        }).then((response) => {
          expect(response.body).property('message').to.contain('Registro alterado com sucesso')
          expect(response.status).to.eq(200)
        })
      })
    })
  })

  it('Update new user successfully', () => {
    const id = 'abcde1234' // id inexistente
    cy.generateUser().then((user) => {
      cy.request({
        method: 'PUT',
        url: 'https://serverest.dev/usuarios/'+id,
        body: user
      }).then((response) => {
        expect(response.body).property('message').to.contain('Cadastro realizado com sucesso')
        expect(response.status).to.eq(201)
      })
    })
  })

  it('Update user unsuccessful', () => {
    cy.registerUser().then((id) => {
      cy.fixture('old_user').then(user => {
        cy.request({
          method:'PUT',
          url: 'https://serverest.dev/usuarios/'+id, 
          body: user,
          failOnStatusCode: false,
          }).then((response) => {
            expect(response.body).property('message').to.contain('Este email já está sendo usado')
            expect(response.status).to.eq(400)
        }) 
      })
    })
  })
})