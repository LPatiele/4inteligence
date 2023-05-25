Feature: Manage users

    Scenario: Get users
        Given has registered users
        When get all users
        Then response contain a user list
        And status code is 200

    Scenario: Criate user successfully
        Given a valid new user data
        When create this new user
        Then response contain message 'Cadastro realizado com sucesso'
        And status code is 201

    Scenario: Criate user unsuccessful
        Given a new user data with e-mail already registered
        When create this new user
        Then response contain message 'Este email já está sendo usado'
        And status code is 400

    Scenario: Get user successfully
        Given the id from a registered user
        When send this id
        Then response contain this data user
        And status code is 200


    Scenario: Get user unsuccessful
        Given the id from a unregistered user
        When send this id
        Then response contain message 'Usuário não encontrado'
        And status code is 400

    Scenario: Delete user successfully
        Given the id from a registered user without cart
        When send this id
        Then response contain message 'Registro excluído com sucesso | Nenhum registro excluído'
        And status code is 200   

    Scenario: Delete user unsuccessful
        Given the id from a registered user with cart
        When send this id
        Then response contain message 'Não é permitido excluir usuário com carrinho cadastrado'
        And status code is 400 

    Scenario: Update user successfully
        Given the id and new data from a registered user
        When send this informations
        Then response contain message 'Registro alterado com sucesso'
        And status code is 200

    Scenario: Update new user successfully
        Given the id and new data from a unregistered user
        When send this informations
        Then response contain message 'Cadastro realizado com sucesso'
        And status code is 201

    Scenario: Update user unsuccessful
        Given the id and new data with a registered e-mail
        When send this informations
        Then response contain message 'Este email já está sendo usado'
        And status code is 400
