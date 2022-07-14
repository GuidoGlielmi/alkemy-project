/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */
import {REQUEST_PENDING, TASKS_SUCCESS, FETCHING_ERROR, LOGIN_SUCCESS} from '../actions/types';

const initialState = {
  loggedIn: !!localStorage.getItem('token'),
  loading: false,
  tasks: [],
  error: '',
};

export default (state = initialState, action) => {
  const cases = {
    [REQUEST_PENDING]: {...state, loading: true},
    [LOGIN_SUCCESS]: {...state, loading: false, loggedIn: true},
    [TASKS_SUCCESS]: {...state, tasks: action.payload, error: '', loading: false},
    [FETCHING_ERROR]: {...state, error: action.payload, loading: false},
  };
  return cases[action.type] || state;
  /* switch (action.type) {
    case REQUEST_PENDING:
      return {...state, loading: true};
    case TASKS_SUCCESS:
      return {...state, tasks: action.payload, error: '', loading: false};
    case FETCHING_ERROR:
      return {...state, tasks: [], error: action.payload, loading: false};
    default:
      return state;
  } */
};
