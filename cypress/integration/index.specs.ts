describe('index.vue', () => {
    it('shows hello', () => {
        cy.visit('/').contains('Documentation');
    });
});
