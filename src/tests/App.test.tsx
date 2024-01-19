import React from 'react';
import renderWithContext from './renderWithContext';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('Teste de filtragens', () => {
  it('Testa filtragem por nome no input', async () => {
    renderWithContext(<App />)
    const input = screen.getByTestId('name-filter')
    await userEvent.type(input, 'oo')

    waitFor(() => {
      const naboo = screen.getByRole('cell', {
        name: /naboo/i
      })
    expect(naboo).toBeInTheDocument();
    })
  })
})
  it('Testa filtragem por select', async () => {
  renderWithContext(<App />)
  const selectColumn = screen.getByTestId('column-filter')
  const selectComparison = screen.getByTestId('comparison-filter')
  const inputValue = screen.getByTestId('value-filter')
  const buttonFilter = screen.getByRole('button', {
    name: /filtrar/i
})
  await userEvent.selectOptions(selectColumn, 'population')
    await userEvent.selectOptions(selectComparison, 'maior que')
    await userEvent.type(inputValue, '1000000')
    await userEvent.click(buttonFilter)
    waitFor(() => {
      const naboo = screen.getByRole('cell', {
        name: /naboo/i
      })
    expect(naboo).toBeInTheDocument();
})
})

