import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCurrencies, requestExpenses } from '../redux/actions';

const METHODS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class WalletForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestCurrencies());
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = () => {
    this.setState((prevState) => ({
      ...INITIAL_STATE,
      id: prevState.id + 1,
    }));
    const { dispatch } = this.props;
    return dispatch(requestExpenses(this.state));
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>

        <label htmlFor="value">
          Valor da despesa
          <input
            data-testid="value-input"
            type="number"
            name="value"
            id="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          Descrição da despesa
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currencies">
          Moeda
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((currencyName) => (
              <option
                key={ currencyName }
                value={ currencyName }
              >
                {currencyName}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            {METHODS.map((methodName) => (
              <option
                key={ methodName }
                value={ methodName }
              >
                {methodName}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="tag">
          Categoria de despesa
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            {TAGS.map((tagName) => (
              <option
                key={ tagName }
                value={ tagName }
              >
                {tagName}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.shape(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
