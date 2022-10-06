// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';

export const GET_CURRENCIES = 'GET_CURRENCIES';

export const ADD_EXPENSES = 'ADD_EXPENSES';

// ACTIONS CREATORS
export const addEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

export const addExpenses = (payload) => ({
  type: ADD_EXPENSES,
  payload,
});

// THUNK
const requestAPI = async () => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endpoint);
  const json = await response.json();
  return json;
};

export const requestCurrencies = () => async (dispatch) => {
  const data = await requestAPI();
  const currencies = Object.keys(data).filter((currencie) => currencie !== 'USDT');
  return dispatch(getCurrencies(currencies));
};

export const requestExpenses = (stateExpenses) => async (dispatch) => {
  const data = await requestAPI();
  return dispatch(addExpenses({ ...stateExpenses, exchangeRates: data }));
};
