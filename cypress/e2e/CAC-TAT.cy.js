/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  });

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    cy.get('input[id="firstName"]')
      .as('textField')
      .should('be.visible')
      .type('Olá mundo!', {delay: 0})
    cy.get('@textField')
      .should('have.value', 'Olá mundo!')

  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
      cy.get('input[id="firstName"]')
        .as('inputNome')
        .type('Luiz Vitor')
      cy.get('@inputNome')
        .should('have.value', 'Luiz Vitor')

      cy.get('input[id="lastName"]')
        .as('inputSobrenome')
        .type('Souza')
      cy.get('@inputSobrenome')
        .should('have.value', 'Souza')

      cy.get('input[id="email"]')
        .as('email')
        .type('emaildasilva@gmail.com')
      cy.get('@email')
        .should('have.value', 'emaildasilva@gmail.com')

      cy.get('textarea[id="open-text-area"]')
        .as('feedback')
        .type('Site para testes.')
      cy.get('@feedback')
        .should('have.value', 'Site para testes.')

      cy.contains('button', 'Enviar').click()
        .click()

      cy.get('span[class="success"]')
        .should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

      cy.get('input[id="firstName"]')
        .as('inputNome')
        .type('Luiz Vitor')
      cy.get('@inputNome')
        .should('have.value', 'Luiz Vitor')

      cy.get('input[id="lastName"]')
        .as('inputSobrenome')
        .type('Souza')
      cy.get('@inputSobrenome')
        .should('have.value', 'Souza')
        cy.contains('button', 'Enviar').click()
        .click()

      cy.get('span[class="error"]')
        .should('be.visible')
    })

  it('valida que campo telefone so aceita numeros', () => {
    cy.get('input[id="phone"]')
    .type('4199999999')  // Digita o número no campo
    .should('have.value', '4199999999')  // Verifica se o valor é o esperado
    .then(($input) => {
      const value = $input.val();  // Obtém o valor real do campo de input
      expect(value).to.match(/^\d+$/);  // Verifica se o valor contém apenas números
    })
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
      const dataTest = {
        name: "Luiz Teste",
        lastName: "Siqueira",
        email:  "TESTA@gmail.com",
        textFeedBack: "Muito Boa Aplicação!"
      }
      cy.fillMandatoryFieldsAndSubmit(dataTest);
      //cy.fillMandatoryFieldsAndSubmit();
      cy.get('span[class="success"]')
        .should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () =>{
    cy.get('#product').select('YouTube')
    cy.get('#product').should('have.value','youtube')
  })

  it('seleciona um produto (YouTube) por seu texto', () =>{
    cy.get('#product').select('mentoria')
    cy.get('#product').should('have.value','mentoria')

  })

  it('seleciona um produto (YouTube) por seu texto', () =>{
    cy.get('#product').select(1)
    cy.get('#product').should('have.value','blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[value="feedback"]').check()
    cy.get('input[value="feedback"]').should('be.checked')

  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(radioButtons => {
      cy.wrap(radioButtons)
      .check()
      .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check()
      .should('be.checked')
      .last().uncheck()
      .last().should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[id="file-upload"]')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect (input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('input[id="file-upload"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect (input[0].files[0].name).to.equal('example.json')
      })
    })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[id="file-upload"]')
      .selectFile('@sampleFile', { action: 'drag-drop' })
      .should(input => {
       expect (input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
    cy.contains('a','Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
    cy.contains('a','Política de Privacidade').invoke('removeAttr','target')
    .click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
     .should('be.visible')
  })

})
