// describe('Navigation', () => {
//   it('should navigate to the about page', () => {
//     // Start from the index page
//     cy.visit('http://localhost:3000/')
 
//     // Find a link with an href attribute containing "about" and click it
//     cy.get('a[href*="about"]').click()
 
//     // The new url should include "/about"
//     cy.url().should('include', '/about')
 
//     // The new page should contain an h1 with "About"
//     cy.get('h1').contains('About Me')
//   })
// })

describe('Home Page', () => {
  beforeEach(() => {
    // Visit homepage before each test
    cy.visit("http://localhost:3000");
  });

  it('should display the welcome message and intro text', () => {
    cy.contains('Welcome to Cooking with Caveats').should('be.visible');
    cy.contains('Finding recipes online has never been easier').should('be.visible');
  });

  it('should fetch and display recipe cards for guests', () => {
    cy.intercept('GET', '/api/random_recipes', {
      fixture: 'recipes.json',
    }).as('getRandomRecipes');

    cy.wait('@getRandomRecipes');

    cy.get('[data-cy=recipe-card]').should('have.length.greaterThan', 0);
  });
  
  it('should redirect to cookbook page if logged in', () => {
    // mock the AuthContext by setting cookie/localStorage or stubbing fetch if needed
    cy.window().then((win) => {
      win.localStorage.setItem('authToken','someToken');
      win.localStorage.setItem('authUser', JSON.stringify({ id: 123, firstName: 'Steve', lastName: 'Ender' }));
    });

    // You might need to mock the `useAuth` or stub navigation for this to work
    // This test setup may vary depending on your auth implementation

    cy.url().should('include', '/123/cookbook');
  });
});

describe('NavBar for Logged-Out User', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.removeItem('authToken');
      win.localStorage.removeItem('authUser');
    });
    cy.visit('http://localhost:3000/')
  });

  it('should show only basic navigation links for logged-out users', () => {
    cy.get('nav').within(() => {
      cy.get('a').should('have.length', 3); 
      cy.get('a').first().should('have.text', 'Recipes');
      cy.get('a').eq(1).should('have.text', 'Cookbooks');
      cy.get('a').eq(2).should('have.text', 'About');
    });
  });

  it('should not show profile icon for logged-out users', () => {
    cy.get('nav').within(() => {
      cy.get('a[href="/profile"]').should('not.exist'); 
    });
  });
});

describe('NavBar for Logged-In User', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('authToken','someToken');
      win.localStorage.setItem('authUser', JSON.stringify({ id: 123, firstName: 'Steve', lastName: 'Ender' }));
    });
    cy.visit('http://localhost:3000/')
  });

  it('should show additional navigation links when logged in', () => {
    cy.get('nav').within(() => {
      cy.get('a').should('have.length', 5); 
      cy.get('a').first().should('have.text', 'My Cookbook');
      cy.get('a').eq(1).should('have.text', 'Recipes');
      cy.get('a').eq(2).should('have.text', 'Cookbooks');
      cy.get('a').eq(3).should('have.text', 'About');
    });
  });

  it('should show profile icon for logged-in users', () => {
    cy.get('nav').within(() => {
      cy.get('a[href="/profile"]').should('exist'); 
    });
  });

  it('should navigate to profile page when profile icon is clicked', () => {
    cy.get('nav').within(() => {
      cy.get('a[href="/profile"]').click();
    });
    cy.url().should('include', '/profile');
  });
});
