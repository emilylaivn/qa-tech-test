describe('My First Test', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:8080/')
    })

    it('.focus() - focus on a DOM element', () => {
        cy.get('.new-todo').focus()
            .type('fake@email.com').should('have.value', 'fake@email.com')
            .type('{enter}')
    })
})