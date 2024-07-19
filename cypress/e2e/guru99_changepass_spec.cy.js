describe('Password Change Test', () => {
    before(() => {
        cy.visit('https://demo.guru99.com/V4/');
        cy.get('input[name="uid"]').type('mngr581849'); 
        cy.get('input[name="password"]').type('@123456'); 
        cy.get('input[name="btnLogin"]').click();
    });
    it('should navigate to the password change page and update the password', () => {
        cy.get('a[href="PasswordInput.php"]').click();
        cy.get('input[name="oldpassword"]').type('ygAjUjU'); 
        cy.get('input[name="newpassword"]').type('@123456'); 
        cy.get('input[name="confirmpassword"]').type('@123456'); 
        cy.get('input[value="Submit"]').click();
        cy.get('a[href="Logout.php"]').click();
        cy.visit('https://demo.guru99.com/V4/');
        cy.get('input[name="uid"]').type('mngr581849'); 
        cy.get('input[name="password"]').type('@123456');
        cy.get('input[name="btnLogin"]').click();
        cy.get('marquee.heading3').should('be.visible');
    });
});
