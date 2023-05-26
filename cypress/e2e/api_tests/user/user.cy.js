
context('Manage users', () => {

    it('Get users', () => {
      cy.request('GET','https://serverest.dev/usuarios').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.not.empty   
      })  
    })

    it('Criate user successfully', () => {
      cy.generateUser()
      cy.fixture('users/new_user').then((user) => {
        cy.request({
          method:'POST',
          url: 'https://serverest.dev/usuarios', 
          body: user
          }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).property('message').to.contain('Cadastro realizado com sucesso')
        }) 
      })
    })

    it('Criate user unsuccessful',() => {
      cy.fixture('users/old_user').then(user => {
        cy.request({
          method:'POST',
          url: 'https://serverest.dev/usuarios', 
          body: user,
          failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).property('message').to.contain('Este email já está sendo usado')
        }) 
      })
    })

    it('Get user successfully', () => {
      const id = '0uxuPY0cbmQhpEz1'
      cy.request('GET', 'https://serverest.dev/usuarios/'+id).then((response) => {
        expect(response.status).to.eq(200)
        //expect(response.body).property('nome').to.eq('Fulano da Silva')
        expect(response.body).property('_id').to.eq(id)
      })
    })

    it('Get user unsuccessful', () => {
      const id = '0uxuPY0cbmQhpEz2'
      cy.request({
        method:'GET', 
        url: 'https://serverest.dev/usuarios/'+id, 
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).property('message').to.contain('Usuário não encontrado')
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
          expect(response.status).to.eq(200)
          expect(response.body).property('message').to.contain('Nenhum registro excluído')
        })
      })
    })

    it('Delete user unsuccessful', () => {
      
    })

    it('Update user successfully', () => {
      
    })

    it('Update new user successfully', () => {
      
    })

    it('Update user unsuccessful', () => {
      
    })
  })