describe('Guru99 Demo Login and Forgot Password Test', () => {
    const baseUrl = 'https://demo.guru99.com/V4/';
    beforeEach(() => {
        cy.visit(baseUrl);
    });
    it('should successfully log in with valid credentials', () => {
        cy.get('input[name="uid"]').should('be.visible').type('mngr581849');
        cy.get('input[name="password"]').should('be.visible').type('ygAjUjU');
        cy.get('input[name="btnLogin"]').should('be.visible').click();
        cy.url().should('include', 'Managerhomepage');
        cy.wait(5000);
        cy.contains('Manger Id : mngr581849').should('be.visible');
    });

    it('should display an error for invalid login credentials', () => {
        cy.get('input[name="uid"]').should('be.visible').type('invalidUser');
        cy.get('input[name="password"]').should('be.visible').type('invalidPass');
        cy.get('input[name="btnLogin"]').should('be.visible').click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('User or Password is not valid');
        });
    });

});
