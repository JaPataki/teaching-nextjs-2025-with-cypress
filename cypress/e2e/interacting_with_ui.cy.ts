describe('Spotify Albums - User Interactions', () => {

    it('should search for an album by name using the search bar', () => {
        cy.visit('/');
        cy.get('[data-cy="album-title"]').first().invoke('text').then((albumName) => {
            cy.get('[data-cy="search-input"]').clear().type(albumName);
            cy.get('[data-cy="search-button"]').click();
            cy.get('[data-cy="search-album"]').should('be.visible').and('contain.text', albumName);
        });
    });

    it('opens detail page for the first album and shows its tracks', () => {
        cy.visit('/');
        cy.get('[data-cy="album-title"]').first().invoke('text').then((albumName) => {
            cy.get('[data-cy="album-card"]').first().within(() => {
                cy.contains('a', 'Detail').click();
            });

            cy.get('[data-cy="album-detail-name"]').should('include.text', albumName);
            cy.get('[data-cy="album-song-row"]').should('have.length.gte', 1);
        });
    });

    it('returns to the homepage when clicking the Spotify logo', () => {
        cy.visit('/');
        cy.get('[data-cy="album-card"]').first().within(() => {
            cy.contains('a', 'Detail').click();
        });

        cy.get('[data-cy="spotify-logo"]').click();
        cy.get('[data-cy="title"]').should('be.visible').and('contain.text', 'Spotify');
    });

    it('displays a message if /search is opened without a query', () => {
        cy.visit('/search');
        cy.contains('No Search query').should('exist').and('be.visible');
    });

    it('keeps the search term visible in the URL', () => {
        cy.visit('/');
        cy.get('[data-cy="album-title"]').first().invoke('text').then((albumName) => {
            const query = albumName.trim();
            cy.get('[data-cy="search-input"]').clear().type(query);
            cy.get('[data-cy="search-button"]').click();
            cy.location('search').should('include', 'q=');
        });
    });

    it('shows each song duration in mm:ss format', () => {
        cy.visit('/');
        cy.get('[data-cy="album-card"]').first().within(() => {
            cy.contains('a', 'Detail').click();
        });

        cy.get('[data-cy="album-song-row"]').first().within(() => {
            cy.get('td').eq(2).invoke('text').should('match', /^\d{1,2}:\d{2}$/);
        });
    });

});
