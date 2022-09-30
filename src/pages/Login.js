import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

const MIN_PASSWORD_LENGTH = 6;

class Login extends React.Component {
  state = {
    emailLocal: '',
    password: '',
    isBtnDisabled: true,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.validateButton());
  };

  validateButton = () => {
    const { emailLocal, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const validateEmail = regex.test(emailLocal);
    const validatePassword = password.length >= MIN_PASSWORD_LENGTH;
    this.setState({ isBtnDisabled: !(validateEmail && validatePassword) });
  };

  handleClick = () => {
    // event.preventDefault(); (não é necessário porque o button é do tipo buton)
    const { history, dispatch } = this.props;
    const { emailLocal } = this.state;
    dispatch(addEmail(emailLocal));
    history.push('/carteira');
  };

  render() {
    const { emailLocal, password, isBtnDisabled } = this.state;
    return (
      <div>
        <h3>Login</h3>
        <form>
          <label htmlFor="email">
            Email
            <input
              data-testid="email-input"
              type="email"
              name="emailLocal"
              value={ emailLocal }
              id="email"
              placeholder="E-mail"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password">
            Senha
            <input
              data-testid="password-input"
              type="password"
              name="password"
              value={ password }
              id="password"
              placeholder="Senha"
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            disabled={ isBtnDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
