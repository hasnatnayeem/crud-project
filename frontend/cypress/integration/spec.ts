import { customers } from './test-data'

describe('Testing CRM application', () => {

  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('CRM')
    cy.contains('New customer')
  })


  it('Should open new customer modal', () => {
    cy.get('.btn-new-customer').first().click()
    cy.wait(500)
    cy.contains('Customer details')
    cy.contains('Name')
    cy.contains('Email')
  })

  xit('Should close new customer modal', () => {
    cy.get('#closeButton').click()
    cy.wait(500)
    cy.get('.modal', { timeout: 500 }).should("not.exist");
  })


  it('should create a new customer and show it on the home page', () => {
    const randomIndex = Math.floor(Math.random() * customers.length);
    let customer = customers[randomIndex]

    cy.get('.table').find('tr').its('length').then(initialLength => {
      cy.get('#name').type(customer.name)
      cy.get('#email').type(customer.email)
      cy.get('#phone').type(customer.phone)
      cy.get('#address').type(customer.address)
      cy.get('#city').type(customer.city)
      cy.get('#zipCode').type(customer.zipCode)
  
      cy.get('#saveButton').click()
  
      cy.get('.table').contains(customer.name)
      cy.get('.table').contains(customer.email)
      cy.get('.table').find('tr').should('have.length', initialLength + 1)
    })
  });


  it('should open customer details in modal', () => {
    cy.get('.btn-customer-details').first().click()
    cy.wait(500)
    cy.contains('Customer details')
    cy.contains('Name')
    cy.contains('Email')

    cy.get('#closeButton').click()
    cy.wait(500)
    cy.get('.modal', { timeout: 500 }).should("not.exist");
  });


  it('should show entered text fro searching', () => {
    cy.get('#searchInput').type('.com')
    cy.contains('Showing results')
  });
  
})

