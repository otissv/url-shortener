// https://docs.cypress.io/api/introduction/api.html

describe("Home Page, () => {
  it("Visits the app root url", () => {
    cy.visit("/")
    cy.contains("h1", "Welcome to URL Shortener")
  })

  it("should not submit invalid url", () => {
    cy.visit("/")
    cy.get("input").type("boo")
    cy.get("button").trigger("click")

    cy.contains("p", "URL is invalid")
  })

  it("should submit valid url", () => {
    cy.visit("/")
    cy.get("input").type("www.google.com")
    cy.get("button").trigger("click")

    cy.contains("p", "Your short code is")
  })
})
