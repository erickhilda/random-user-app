describe("Navigation", () => {
  it("should navigate to index page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    cy.intercept({
      method: "GET",
      url: "https://randomuser.me/api/?page=1&results=10&inc=name,gender,phone,email,registered&gender=all",
    }).as("fetchUsers");

    // have the title of the page
    cy.get("h1").should("contain", "Data Table Demonstrations");
    cy.get(".ant-spin").should("exist");

    cy.wait("@fetchUsers").then((interception) => {
      assert.isNotNull(interception.response.body, "fetch Users API call return data");
    });
  });
});
