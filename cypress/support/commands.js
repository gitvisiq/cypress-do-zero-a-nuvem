Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    name: 'Luiz',
    lastName:  'Siqueira',
    email:  'default@gmail.com',
    textFeedBack: 'Text Default'

}) =>  {

    cy.get('input[id="firstName"]')
      .as('inputNome')
      .type(data.name);
    cy.get('@inputNome')
      .should('have.value', data.name)

    cy.get('input[id="lastName"]')
      .as('inputSobrenome')
      .type(data.lastName);
    cy.get('@inputSobrenome')
      .should('have.value', data.lastName)

    cy.get('input[id="email"]')
      .as('email')
      .type(data.email);
    cy.get('@email')
      .should('have.value', data.email)

    cy.get('textarea[id="open-text-area"]')
      .as('feedback')
      .type(data.textFeedBack)
    cy.get('@feedback')
      .should('have.value', data.textFeedBack)

      cy.contains('button', 'Enviar').click()

  })
