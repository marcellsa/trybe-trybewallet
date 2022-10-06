import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    return expenses.reduce((acc, expense) => (
      acc + (Number(expense.value)
      * Number(expense.exchangeRates[expense.currency].ask))
    ), 0);
  };

  render() {
    const { email } = this.props;
    return (
      <header>
        <h3>TRYBEWALLET</h3>

        <span data-testid="email-field">{email}</span>
        <div>
          <span>Despesa Total: </span>
          <span data-testid="total-field">
            {this.totalExpenses().toFixed(2)}
          </span>
          <span data-testid="header-currency-field"> BRL</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.shape(PropTypes.string),
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
