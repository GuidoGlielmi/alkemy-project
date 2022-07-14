import {api} from 'components/auth-context/AuthContext';

import {TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE} from './types';
// import { createStore } from 'redux';
export const tasksRequest = () => ({type: TASKS_REQUEST});
export const tasksSuccess = (data) => ({type: TASKS_SUCCESS, payload: data});
export const tasksFailure = (err) => ({type: TASKS_FAILURE, payload: err});
export const getTasks = () => async (dispatch) => {
  // redux calls getTasks with the dispatch function as the first argument

  /*
  function dispatch(functionThatDoesTheFetching) {
    functionThatDoesTheFetching(dispatch)
  }
  dispatch(getTasks())
  */

  dispatch(tasksRequest()); // siempre se pasa la acción en sí, no la funcion
  try {
    const {data} = await api.get();
    dispatch(tasksSuccess(data));
  } catch (err) {
    dispatch(tasksFailure(err));
  }
};
