import React from 'react';
import renderWithContext from './renderWithContext';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Teste do primeiro input', () => {
  it('Testa se existe um header no App', () => {
    renderWithContext(<App />)
    const header = screen.getByRole('heading', {
      name: /projeto star wars \- trybe/i
    })
    expect(header).toBeInTheDocument();
})
it('Testa se existe um input no App', () => {
  renderWithContext(<App />)
  const input = screen.getByTestId('name-filter')
  expect(input).toBeInTheDocument();
})
})