import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses } from '../redux/actions';

class Table extends Component {
  handleDeleteBtn = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpenses(id));
  };

  handleEditBtn = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpenses(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ Number(expense.value).toFixed(2) }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
              <td>
                { (Number(expense.exchangeRates[expense.currency].ask)
                * Number(expense.value)).toFixed(2) }
              </td>
              <td>BRL</td>
              <td>
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => this.handleDeleteBtn(expense.id) }
                >
                  Excluir
                </button>

                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => this.handleEditBtn(expense.id) }
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.shape(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(Table);
