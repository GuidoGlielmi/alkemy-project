import {api} from 'components/auth-context/AuthContext';
import login from 'services/login';

import {REQUEST_PENDING, FETCHING_ERROR, TASKS_SUCCESS, LOGIN_SUCCESS, LOGOUT} from './types';
// import { createStore } from 'redux';
export const loginRequest = (values) => async (dispatch) => {
  dispatch(fetchingData());
  try {
    const token = await login(values);
    localStorage.setItem('token', token);
    dispatch(loginSuccess());
  } catch (err) {
    dispatch(fetchingError(err));
  }
};
export const fetchingData = () => ({type: REQUEST_PENDING});
export const fetchingError = (err) => ({type: FETCHING_ERROR, payload: err});
export const loginSuccess = () => ({type: LOGIN_SUCCESS});
export const logout = () => ({type: LOGOUT});
export const tasksSuccess = (data) => ({type: TASKS_SUCCESS, payload: data});
export const getTasks = () => async (dispatch) => {
  // redux calls getTasks with the dispatch function as the first argument

  /*
  function dispatch(functionThatDoesTheFetching) {
    functionThatDoesTheFetching(dispatch)
  }
  dispatch(getTasks())
  */

  dispatch(fetchingData()); // siempre se pasa la acción en sí, no la funcion
  try {
    const {data} = await api.get();
    dispatch(tasksSuccess(data));
  } catch (err) {
    // dispatch(tasksFailure(err));
  }
};
