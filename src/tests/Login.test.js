import React from 'react';
import { screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';

describe('Teste a página de Login', () => {
  test('Se os campos de email e senha estão presentes na página', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();

    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();
  });

  test('Se o botão Entrar é habilitado na página após inserir informações', () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
  });
});
