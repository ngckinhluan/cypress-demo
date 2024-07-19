describe("Guru99 Add Customer Test", () => {
  before(() => {
    cy.visit("https://demo.guru99.com/V4/");
    cy.get('input[name="uid"]').type("mngr581849");
    cy.get('input[name="password"]').type("ygAjUjU");
    cy.get('input[name="btnLogin"]').click();
    cy.wait(5000);
  });
  it("should successfully add a customer", () => {
    cy.visit("https://demo.guru99.com/V4/manager/addcustomerpage.php");

    cy.get('input[name="name"]').type("Alice Smith");
    cy.get('input[name="rad1"][value="f"]').check();
    cy.get('input[name="dob"]').type("1985-05-15");
    cy.get('textarea[name="addr"]').type("456 Elm St Suite 10");
    cy.get('input[name="city"]').type("Los Angeles");
    cy.get('input[name="state"]').type("CA");
    cy.get('input[name="pinno"]').type("900001");
    cy.get('input[name="telephoneno"]').type("9876543210");
    cy.get('input[name="emailid"]').type("alice.smith7722@example.com");
    cy.get('input[name="password"]').type("654321");
    cy.get('input[type="submit"]').click();
    cy.wait(5000);
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it("should show error messages for invalid input", () => {
    cy.visit("https://demo.guru99.com/V4/manager/addcustomerpage.php");
    cy.get('input[name="name"]').clear();
    cy.get('input[name="dob"]').clear();
    cy.get('textarea[name="addr"]').clear();
    cy.get('input[name="city"]').clear();
    cy.get('input[name="state"]').clear();
    cy.get('input[name="pinno"]').clear();
    cy.get('input[name="telephoneno"]').clear();
    cy.get('input[name="emailid"]').clear();
    cy.get('input[name="password"]').clear();
    cy.get('input[type="submit"]').click();
    cy.contains("Customer name must not be blank").should("be.visible");
    cy.contains("Date Field must not be blank").should("be.visible");
    cy.contains("Address Field must not be blank").should("be.visible");
    cy.contains("City Field must not be blank").should("be.visible");
    cy.contains("State must not be blank").should("be.visible");
    cy.contains("PIN Code must not be blank").should("be.visible");
    cy.contains("Mobile no must not be blank").should("be.visible");
    cy.contains("Email-ID must not be blank").should("be.visible");
    cy.contains("Password must not be blank").should("be.visible");
  });

  it("should display an error message when adding a customer with a duplicated email", () => {
    before(() => {
      cy.visit("https://demo.guru99.com/V4/");
      cy.get('input[name="uid"]').type("mngr581849");
      cy.get('input[name="password"]').type("ygAjUjU");
      cy.get('input[name="btnLogin"]').click();
      cy.wait(5000);
    });
    cy.visit("https://demo.guru99.com/V4/manager/addcustomerpage.php");
    cy.get('input[name="name"]').type("Alice Smith");
    cy.get('input[name="rad1"][value="f"]').check();
    cy.get('input[name="dob"]').type("1985-05-15");
    cy.get('textarea[name="addr"]').type("456 Elm St Suite 10");
    cy.get('input[name="city"]').type("Los Angeles");
    cy.get('input[name="state"]').type("CA");
    cy.get('input[name="pinno"]').type("900001");
    cy.get('input[name="telephoneno"]').type("9876543210");
    cy.get('input[name="emailid"]').type("alice.smith77122@example.com");
    cy.get('input[name="password"]').type("654321");
    cy.get('input[type="submit"]').click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Email already exists");
    });
  });
});
