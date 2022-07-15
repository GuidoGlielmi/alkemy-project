import {
  REQUEST_PENDING,
  TASKS_SUCCESS,
  REQUEST_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  FORM_INFO_SUCCESS,
  REGISTER_SUCCESS,
  UNAUTHORIZE,
  CLEAR_JUST_REGISTERED,
} from '../actions/types';

const initialState = {
  loggedIn: !!localStorage.getItem('token'),
  username: localStorage.getItem('username') || '',
  loading: false,
  tasks: [],
  roles: [],
  continents: [],
  regions: [],
  error: '',
  justRegistered: false,
};

export default (state = initialState, action) => {
  const cases = {
    [REQUEST_PENDING]: {...state, loading: true},
    [REQUEST_ERROR]: {...state, error: action.payload, loading: false},
    [LOGIN_SUCCESS]: {
      ...state,
      loggedIn: true,
      username: action.payload?.username,
      loading: false,
    },
    [LOGOUT]: {...state, loggedIn: false, username: ''},
    [TASKS_SUCCESS]: {...state, tasks: action.payload, error: '', loading: false},
    [FORM_INFO_SUCCESS]: {
      ...state,
      roles: action.payload?.roles,
      continents: action.payload?.continents,
      regions: action.payload?.regions,
      loading: false,
    },
    [REGISTER_SUCCESS]: {
      ...state,
      username: action.payload,
      justRegistered: true,
      loading: false,
    },
    [CLEAR_JUST_REGISTERED]: {...state, justRegistered: false},
    [UNAUTHORIZE]: {...state, loggedIn: false},
  };
  return cases[action.type] || state;
};
