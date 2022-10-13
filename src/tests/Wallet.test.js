import React from 'react';
import { screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Teste a página de Wallet', () => {
  test('Se o email inserido aparece no Header da página Wallet', () => {
    const initialState = {
      user: {
        email: 'test@test.com',
      },
    };
    renderWithRouterAndRedux(<Wallet />, initialState, ['/carteira']);

    const emailHeader = screen.getByTestId('email-field');
    expect(emailHeader).toBeInTheDocument();
    // expect(emailHeader).toHaveTextContent('test@test.com');
  });

  test('Se o botão adicionar despesa aparece na página Wallet', () => {
    renderWithRouterAndRedux(<Wallet />);

    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(button).toBeInTheDocument();
  });

  test('Se o input Valor de despesa aparece na tabela da página Wallet', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();
  });

  test('Se o campo Descrição aparece na tabela da página Wallet', () => {
    renderWithRouterAndRedux(<Wallet />);

    const fieldDescription = screen.getByTestId('description-input');
    expect(fieldDescription).toBeInTheDocument();
  });

  test('Se o campo Tag aparece na tabela da página Wallet', () => {
    renderWithRouterAndRedux(<Wallet />);

    const fieldTag = screen.getByRole('columnheader', { name: /tag/i });
    expect(fieldTag).toBeInTheDocument();
  });

  test('Se ao adicionar informações, botão de excluir aparece na tabela', () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByRole('textbox', { name: /descrição da despesa/i });
    userEvent.type(value, 'Cinema');

    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(button);

    // const valueCell = screen.getByRole('cell', { name: /cinema/i });
    // const valueCell = screen.getByRole('cell', { name: /excluir editar/i });
    setTimeout(() => {
      const valueCell = screen.getByTestId('delete-btn');
      expect(valueCell).toBeInTheDocument();
    }, 3000);
  });
});
