describe("Guru99 Delete Customer Test", () => {
  before(() => {
    cy.visit("https://demo.guru99.com/V4/");
    cy.get('input[name="uid"]').type("mngr581849");
    cy.get('input[name="password"]').type("ygAjUjU");
    cy.get('input[name="btnLogin"]').click();
  });

  it("should successfully delete an existing customer", () => {
    cy.visit("https://demo.guru99.com/V4/manager/addcustomerpage.php");
    cy.get('input[name="name"]').type("Alice Smith");
    cy.get('input[name="rad1"][value="f"]').check();
    cy.get('input[name="dob"]').type("1985-05-15");
    cy.get('textarea[name="addr"]').type("456 Elm St Suite 10");
    cy.get('input[name="city"]').type("Los Angeles");
    cy.get('input[name="state"]').type("CA");
    cy.get('input[name="pinno"]').type("900001");
    cy.get('input[name="telephoneno"]').type("9876543210");
    cy.get('input[name="emailid"]').type("alice.smith99123@example.com");
    cy.get('input[name="password"]').type("654321");
    cy.get('input[type="submit"]').click();
    cy.get('input[name="customerid"]')
      .invoke("val")
      .then((customerId) => {
        cy.visit("https://demo.guru99.com/V4/manager/DeleteCustomerInput.php");
        cy.get('input[name="cusid"]').type(customerId);
        cy.get('input[type="submit"]').click();
        cy.contains("Customer deleted Successfully").should("be.visible");
      });
  });

  it("should display an error message when attempting to delete a non-existent customer", () => {
    cy.visit("https://demo.guru99.com/V4/manager/DeleteCustomerInput.php");
    cy.get('input[name="cusid"]').type("99999");
    cy.get('input[type="submit"]').click();
    cy.get("p.error").should("contain.text", "Customer does not exist");
  });

  it("should display an error message when attempting to delete with invalid ID characters", () => {
    cy.visit("https://demo.guru99.com/V4/manager/DeleteCustomerInput.php");
    cy.get('input[name="cusid"]').type("abc123!@#");
    cy.get('input[type="submit"]').click();
    cy.get("p.error").should("contain.text", "Invalid Customer ID");
  });
});
