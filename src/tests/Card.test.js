import {render, screen, fireEvent} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import '@testing-library/jest-dom';
// import 'jest-extended';
import store from 'redux/store/store';
import Card from 'components/card/Card';

const renderWithRedux = (component) => <Provider store={store}>{component}</Provider>;

const card = {
  _id: 'asd',
  title: 'asd',
  status: 'asd',
  importance: 'asd',
  createdAt: 'asd',
  modifiedAt: 'asd',
  description:
    'asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd ',
  user: 'asd',
};

it('renders an h3', () => {
  render(renderWithRedux(<Card task={card} />), {wrapper: MemoryRouter});
  const h3 = screen.getByRole('heading', {name: 'Creado por:'});
  expect(h3).toBeInTheDocument();
});
it('enables long description', () => {
  render(renderWithRedux(<Card task={card} />), {wrapper: MemoryRouter});
  const description = screen.getByTitle('Ver más');
  expect(description).toBeInTheDocument();
  fireEvent.click(description);
  expect(description).toHaveAttribute('title', 'Ver menos');
});
