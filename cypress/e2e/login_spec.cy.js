describe("Login Page", () => {
  const baseUrl = "http://localhost:3030"; // Replace with your app's URL

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("should successfully log in with valid credentials", () => {
    cy.get('input[id=":r0:"]')
      .scrollIntoView()
      .type("luantnk2907@gmail.com", { force: true });
    cy.get('input[id=":r1:"]').scrollIntoView().type("123456", { force: true });
    cy.get("button").contains("Login").click({ force: true });
    cy.url().should("include", "/dashboard");
    cy.wait(5000);
    cy.contains("You have successfully logged in").should("be.visible");
  });

  it("should display an error message with invalid credentials", () => {
    cy.get('input[id=":r0:"]')
      .scrollIntoView()
      .type("invalid@gmail.com", { force: true });
    cy.get('input[id=":r1:"]')
      .scrollIntoView()
      .type("wrongpassword", { force: true });
    cy.get("button").contains("Login").click({ force: true });
    cy.contains("Error with login response").should("be.visible");
  });
});
