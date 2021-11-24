describe('index.vue', () => {
    it('shows landing page', () => {
        cy.visit('').contains('Public landing');
    });
});
