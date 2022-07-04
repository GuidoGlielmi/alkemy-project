/* import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from 'components/button/Button';
// import Register from 'components/views/register/Register';
// import Login from 'components/views/login/Login';
import AuthContext from 'components/auth-context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import LoadingContext from 'components/loading-context/LoadingContext';
import App from 'App';
import React from 'react'; */
// import { MemoryRouter } from 'react-router-dom';

// npm test -- test1.test.js
/* npm run test will execute every .test files in the main folder */
/* it('Fetched team id', async () => {
  render(<Login />, { wrapper: MemoryRouter });
  expect(screen.getByRole()).toHaveAttribute('placeholder', 'Ingrese su usuario');
   */ /*
  getBy, findBy, queryBy all return only one element, or error
  'find' is the only method that supports async await
  'query' is like get but returns null if there is no match, so it's useful to check
  the element is not present */
// });
/* it('should return a button', () => {
  let asd;
  render(<Button action={() => (asd = 45)}>asd</Button>);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent('asd');
  expect(asd).toEqual(45);
}); */

/* it("should fetch an 'Europa' option", async () => {
  render(<Register />, { wrapper: MemoryRouter });
  expect(await screen.findByRole('option', { name: 'Europa' })).toBeInTheDocument();
  // doesnt work because it uses the axios instance of auth context
}); */

/* describe('log in and return a specific card', () => {
  it('asd', async () => {
    render(
      <React.StrictMode>
        <AuthContext>
          <BrowserRouter>
            <LoadingContext>
              <App />
            </LoadingContext>
          </BrowserRouter>
        </AuthContext>
      </React.StrictMode>,
    );
    const username = screen.getByLabelText(/userName/i);
    const password = screen.getByLabelText(/password/i);
    const loginButton = screen.getByText('button', 'Enviar');
    fireEvent.change(username, { target: { value: 'guido1' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.click(loginButton);
    const teamId = await screen.findByRole('heading', { value: 3 });
    expect(teamId).toHaveTextContent('Team id: 0ea9502e-43af-4594-b2ea-396b6ea00638');
  });
}); */
