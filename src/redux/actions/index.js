// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';

export const GET_CURRENCIES = 'GET_CURRENCIES';

// ACTIONS CREATORS
export const addEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

// THUNK
export const requestCurrencies = () => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endpoint);
  const data = await response.json();
  const currencies = Object.keys(data).filter((currencie) => currencie !== 'USDT');
  return dispatch(getCurrencies(currencies));
};
