Feature: Login

    Scenario: Successful login
        Given open login page
        When insert valid login data
        And submit login
        Then should go to home page

    Scenario: Failed login
        Given open login page
        When insert invalid login data
        And submit login
        Then should see error mensage 'Email e/ou senha inválidos'