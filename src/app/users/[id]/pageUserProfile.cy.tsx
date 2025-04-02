import React from 'react'
import UserProfile from './page'

describe('UserProfile', () => {
  it('renders', () => {
    const params = Promise.resolve({ id: "123" }); // Mocked params
    cy.mount(<UserProfile params={params} />);
  });
});
