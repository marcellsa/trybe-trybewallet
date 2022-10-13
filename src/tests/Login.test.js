import React from 'react';
import { screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import App from '../App';

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

  test('Se o botão está desabilitado', () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeDisabled();
  });

  test('Se o botão foi habilitado', () => {
    renderWithRouterAndRedux(<Login />);

    const emailTest = 'test@login.com';
    const passwordTest = '123456';

    const email = screen.getByText(/email/i);
    const password = screen.getByText(/senha/i);

    userEvent.type(email, emailTest);
    userEvent.type(password, passwordTest);

    const button = screen.queryByText('Entrar');
    expect(button).toBeEnabled();
  });

  test('Se ao clicar no botão, é redirecionado para página Wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const emailTest = 'test@login.com';
    const passwordTest = '123456';

    const email = screen.getByText(/email/i);
    const password = screen.getByText(/senha/i);

    userEvent.type(email, emailTest);
    userEvent.type(password, passwordTest);

    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
    // setTimeout(() => {
    //   expect(pathname).toBe('/carteira');
    // }, 3000);
  });
});
