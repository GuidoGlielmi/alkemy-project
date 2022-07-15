import {api} from 'components/auth-context/AuthContext';
import {setToken} from 'services/apiSingleton';
import loginService from 'services/login';
import {formDataService, registerService} from 'services/register';

import {
  REQUEST_PENDING,
  REQUEST_ERROR,
  TASKS_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  FORM_INFO_SUCCESS,
  REGISTER_SUCCESS,
  UNAUTHORIZE,
  CLEAR_JUST_REGISTERED,
} from './types';

export const requestPending = () => ({type: REQUEST_PENDING});
export const requestError = (err) => ({type: REQUEST_ERROR, payload: err});

export const loginRequest = (values) => async (dispatch) => {
  dispatch(requestPending());
  try {
    const token = await loginService(values);
    localStorage.setItem('token', token);
    setToken(token);
    dispatch(loginSuccess(values));
  } catch (err) {
    if (err.response.status === 401) {
      localStorage.removeItem('token');
      dispatch(unauthorize(err));
    } else dispatch(requestError(values));
  }
};

export const loginSuccess = (payload) => ({type: LOGIN_SUCCESS, payload});
export const logout = () => ({type: LOGOUT});
export const unauthorize = () => ({type: UNAUTHORIZE});

export const getFormInfo = () => async (dispatch) => {
  dispatch(requestPending());
  try {
    const {Rol: roles, continente: continents, region: regions} = await formDataService();
    dispatch(formInfoSuccess({roles, continents, regions}));
  } catch (err) {
    dispatch(requestError(err));
  }
};
export const formInfoSuccess = (payload) => ({type: FORM_INFO_SUCCESS, payload});
export const register = (values) => async (dispatch) => {
  dispatch(requestPending());
  try {
    await registerService(values);
    localStorage.setItem('username', values.userName);
    dispatch(registerSuccess(values.userName));
  } catch ({message}) {
    dispatch(requestError(message));
  }
};
export const registerSuccess = (payload) => ({type: REGISTER_SUCCESS, payload});
export const clearJustRegistered = () => ({type: CLEAR_JUST_REGISTERED});

export const tasksSuccess = (payload) => ({type: TASKS_SUCCESS, payload});
export const getTasks = () => async (dispatch) => {
  // redux calls getTasks with the dispatch function as the first argument

  /*
  function dispatch(functionThatDoesTheFetching) {
    functionThatDoesTheFetching(dispatch)
  }
  dispatch(getTasks())
  */

  dispatch(requestPending()); // siempre se pasa la acción en sí, no la funcion
  try {
    const {data} = await api.get();
    dispatch(tasksSuccess(data));
  } catch (err) {
    // dispatch(tasksFailure(err));
  }
};
