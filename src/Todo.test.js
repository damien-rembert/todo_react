import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './Todo';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Todo />, div);
});


test('renders header', () => {
  render(<Todo />);
  const element = screen.getByRole("textbox");
  expect(element).toBeInTheDocument();
});
