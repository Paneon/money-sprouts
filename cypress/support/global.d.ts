declare namespace Cypress {
    interface Chainable {
        seed(story: string): Chainable<void>;
    }
}
