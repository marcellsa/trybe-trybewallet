import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalExpense } = this.props;
    return (
      <header>
        <h3>TRYBEWALLET</h3>

        <span data-testid="email-field">{email}</span>
        <div>
          <span>Despesa Total: </span>
          <span data-testid="total-field">{totalExpense}</span>
          <span data-testid="header-currency-field"> BRL</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  // totalExpense: PropTypes.number,
}.isRequired;

Header.defaultProps = {
  totalExpense: 0,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
