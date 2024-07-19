it("should successfully edit an existing customer's details", () => {
    // Add a customer first to ensure there is one to edit
    cy.visit("https://demo.guru99.com/V4/manager/addcustomerpage.php");
    
    // Fill in the form to add a customer
    cy.get('input[name="name"]').type("Alice Smith");
    cy.get('input[name="rad1"][value="f"]').check();
    cy.get('input[name="dob"]').type("1985-05-15");
    cy.get('textarea[name="addr"]').type("456 Elm St Suite 10");
    cy.get('input[name="city"]').type("Los Angeles");
    cy.get('input[name="state"]').type("CA");
    cy.get('input[name="pinno"]').type("900001");
    cy.get('input[name="telephoneno"]').type("9876543210");
    cy.get('input[name="emailid"]').type("alice.smith223@example.com");
    cy.get('input[name="password"]').type("654321");
    cy.get('input[type="submit"]').click();
    
    // Extract customer ID (you may need to adjust this based on how IDs are handled in your app)
    cy.url().should('contain', 'AddCustomer');
    cy.get('input[name="customerid"]').invoke('val').then((customerId) => {
      // Visit edit page
      cy.visit("https://demo.guru99.com/V4/manager/editcustomerpage.php");
      cy.get('input[name="cusid"]').type(customerId);
      cy.get('input[type="submit"]').click();
  
      // Modify customer details
      cy.get('input[name="addr"]').clear().type("789 Oak St Suite 20");
      cy.get('input[name="city"]').clear().type("San Francisco");
      cy.get('input[name="state"]').clear().type("CA");
      cy.get('input[type="submit"]').click();
  
      // Verify successful update
      cy.get('p.heading3').should('contain.text', 'Customer details updated Successfully');
    });

    it("should display an error message when attempting to edit a non-existent customer", () => {
        cy.visit("https://demo.guru99.com/V4/manager/editcustomerpage.php");
      
        // Use a non-existent customer ID
        cy.get('input[name="cusid"]').type("99999"); // Example of a non-existent ID
        cy.get('input[type="submit"]').click();
      
        // Check for an error message indicating the customer does not exist
        cy.get('p.error').should('contain.text', 'Customer does not exist');
      });

      it("should display an error message when attempting to edit with invalid input", () => {
        // Add a customer first
        cy.visit("https://demo.guru99.com/V4/manager/addcustomerpage.php");
        
        // Fill in the form to add a customer
        cy.get('input[name="name"]').type("Alice Smith");
        cy.get('input[name="rad1"][value="f"]').check();
        cy.get('input[name="dob"]').type("1985-05-15");
        cy.get('textarea[name="addr"]').type("456 Elm St Suite 10");
        cy.get('input[name="city"]').type("Los Angeles");
        cy.get('input[name="state"]').type("CA");
        cy.get('input[name="pinno"]').type("900001");
        cy.get('input[name="telephoneno"]').type("9876543210");
        cy.get('input[name="emailid"]').type("alice.smith223@example.com");
        cy.get('input[name="password"]').type("654321");
        cy.get('input[type="submit"]').click();
        
        // Extract customer ID (you may need to adjust this based on how IDs are handled in your app)
        cy.url().should('contain', 'AddCustomer');
        cy.get('input[name="customerid"]').invoke('val').then((customerId) => {
          // Visit edit page
          cy.visit("https://demo.guru99.com/V4/manager/editcustomerpage.php");
          cy.get('input[name="cusid"]').type(customerId);
          cy.get('input[type="submit"]').click();
      
          // Modify customer details with invalid input
          cy.get('input[name="addr"]').clear().type("789 Oak St Suite 20");
          cy.get('input[name="city"]').clear().type(""); // Invalid input (empty field)
          cy.get('input[name="state"]').clear().type("CA");
          cy.get('input[type="submit"]').click();
      
          // Check for an error message indicating invalid input
          cy.get('p.error').should('contain.text', 'City field is required');
        });
      });
      
      
  });
  