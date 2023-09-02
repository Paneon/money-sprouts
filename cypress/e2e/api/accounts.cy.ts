/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

type TestAccountCtx = {};

describe('API - Account', () => {
    let ctx: TestAccountCtx = {};

    beforeEach(function () {
        cy.task('db:seed');
    });

    context('GET /accounts', () => {
        cy.request('/api/accounts/', HttpMethod)

        it('should return JSON', () => {
            cy.request('/api/accounts.json')
                .its('headers')
                .its('content-type')
                .should('include', 'application/json');
        });
    });

    context('GET /accounts/:accountId', () => {
        it('should return an account', () => {});
    });
});
