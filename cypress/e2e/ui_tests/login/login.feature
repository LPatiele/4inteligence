Feature: Login

    Scenario: Successful login
        Given open login page
        When insert valid login data
        And submit login
        Then should go to home page
        And h1 should contains user name

    Scenario: Failed login
        Given open login page
        When insert invalid login data
        And submit login
        Then should continue in login page
        And should see error mensage 'Email e/ou senha inválidos'

    Scenario: Logout
        Given be logged in
        When submit logout
        Then should see the login page