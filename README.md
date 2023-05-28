# 4intelligence

4intelligence chalenge for QA mid.

### Projeto de automação elaborado como resposta ao desafio proposto pela 4intelligence.

O projeto consite em:
- Testes de API dos cenários de gestão de usuários escritos em BDD e automatizados por meio do Cypress;
- Testes de UI dos cenários de login escritos em BDD e automatizados por meio do Cypress;
- Teste de Pico no endpoint de listagem de usuários cadastrados usando K6;
- Teste de carga no endpoit de listagem de usuários cadastrados usando K6.

### Requisitos e preparação do ambiente

Para rodar o projeto localmente é necessário a instalação do node JS (recomendada instalação padrão) e colagem ou download deste projeto.
No repositório do projeto execute o comando a seguir para instalar as dependencias do projeto:
`npm install`

### Rodando o projeto

* Para abrir o dashboard do Cypress use o comando:
`npm run cy:open`
Através do dashboard do cypress é possível executar os testes de API e UI separadamente e acompanhar detalhes das execuções.
* Para executar os cenário de testes de API e UI através de linha de comando no no navegados chrome execute:
`npm run cy:run:chrome`
* Para executar os cenário de testes de API e UI através de linha de comando no no navegados firefox execute:
`npm run cy:run:firefox`
* Para executar o teste de pico use o comando:
`npm run k6:peak`
* Para executar o teste de carga use o comando:
`npm run K6:load`


