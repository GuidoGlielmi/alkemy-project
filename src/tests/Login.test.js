import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import '@testing-library/jest-dom';
import store from 'redux/store/store';
import Login from '../views/login/Login';

const reduxWrapper = (component) => <Provider store={store}>{component}</Provider>;

it('populates the input', () => {
  render(reduxWrapper(<Login />), {wrapper: MemoryRouter});
  const usernameInput = screen.getByRole('textbox', {name: /Usuario/i});
  // const username = screen.getByLabelText(/userName/i);
  expect(usernameInput).toBeDefined();
  fireEvent.change(usernameInput, {target: {value: 'guido'}});
  expect(usernameInput).toHaveValue('guido');
});

it('adds "error" class', async () => {
  render(reduxWrapper(<Login />), {wrapper: MemoryRouter});
  const usernameInput = screen.getByRole('textbox', {name: /Usuario/i});
  fireEvent.focus(usernameInput);
  fireEvent.blur(usernameInput);
  await waitFor(() => expect(usernameInput).toHaveClass('error')); // waitFor used 'cause of formik
});

it('clears "error" class', async () => {
  render(reduxWrapper(<Login />), {wrapper: MemoryRouter});
  const usernameInput = screen.getByRole('textbox', {name: /Usuario/i});
  fireEvent.focus(usernameInput);
  fireEvent.blur(usernameInput);
  fireEvent.focus(usernameInput);
  await waitFor(() => expect(usernameInput).not.toHaveClass('error'));
});

it('logs in', async () => {
  render(reduxWrapper(<Login />), {wrapper: MemoryRouter});
  const usernameInput = screen.getByRole('textbox', {name: /Usuario/i});
  const passwordInput = screen.getByLabelText('Contraseña');
  expect(usernameInput).toBeDefined();
  expect(passwordInput).toBeDefined();
  fireEvent.change(usernameInput, {target: {value: 'guido'}});
  fireEvent.change(passwordInput, {target: {value: '123456'}});
  const submit = screen.getByText('Enviar');
  fireEvent.click(submit);
  /*   await waitFor(() => {
    const crearTareaHeading = screen.getByRole('heading', {name: /Crear tarea/i});
    expect(crearTareaHeading).toBeDefined();
  }); */
});
