import {api} from 'components/auth-context/AuthContext';
import {setToken} from 'services/apiSingleton';
import loginService from 'services/login';
import {formDataService, registerService} from 'services/register';
import {
  addTaskService,
  deleteTaskService,
  getTasksService,
  taskDataService,
  updateTaskService,
} from 'services/tasks';

import {
  REQUEST_PENDING,
  REQUEST_ERROR,
  TASKS_SUCCESS,
  ADD_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  FORM_INFO_SUCCESS,
  REGISTER_SUCCESS,
  UNAUTHORIZE,
  CLEAR_JUST_REGISTERED,
  TASK_DATA_SUCCESS,
} from './types';

export const requestPending = () => ({type: REQUEST_PENDING});
export const requestError = (err) => ({type: REQUEST_ERROR, payload: err});

export const loginRequest = (values) => async (dispatch) => {
  dispatch(requestPending());
  try {
    const token = await loginService(values);
    localStorage.setItem('token', token);
    dispatch(loginSuccess(values));
  } catch (err) {
    errorHandler(err, dispatch);
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
    errorHandler(err, dispatch);
  }
};
export const formInfoSuccess = (payload) => ({type: FORM_INFO_SUCCESS, payload});
export const register = (values) => async (dispatch) => {
  dispatch(requestPending());
  try {
    await registerService(values);
    localStorage.setItem('username', values.userName);
    dispatch(registerSuccess(values.userName));
  } catch (err) {
    errorHandler(err, dispatch);
  }
};
export const registerSuccess = (payload) => ({type: REGISTER_SUCCESS, payload});
export const clearJustRegistered = () => ({type: CLEAR_JUST_REGISTERED});

export const getTasks = () => async (dispatch) => {
  dispatch(requestPending());
  taskDataService()
    .then((data) => dispatch(taskDataSuccess(data)))
    .catch((err) => errorHandler(err, dispatch));
  getTasksService()
    .then((tasks) => dispatch(tasksSuccess(tasks)))
    .catch((err) => errorHandler(err, dispatch));
};
export const tasksSuccess = (payload) => ({type: TASKS_SUCCESS, payload});
export const taskDataSuccess = (payload) => ({type: TASK_DATA_SUCCESS, payload});
export const addTask = (task, resetForm) => async (dispatch) => {
  dispatch(requestPending());
  try {
    const createdTask = await addTaskService(task);
    resetForm();
    dispatch(addTaskSuccess(createdTask));
  } catch (err) {
    errorHandler(err, dispatch);
  }
};
export const addTaskSuccess = (payload) => ({type: ADD_TASK_SUCCESS, payload});
export const updateTask = (id, task) => async (dispatch) => {
  dispatch(requestPending());
  try {
    await updateTaskService(id, task);
    dispatch(updateTaskSuccess({id, task}));
  } catch (err) {
    errorHandler(err, dispatch);
  }
};
export const updateTaskSuccess = (payload) => ({type: UPDATE_TASK_SUCCESS, payload});
export const deleteTask = (id) => async (dispatch) => {
  dispatch(requestPending());
  try {
    await deleteTaskService(id);
    dispatch(deleteTaskSuccess(id));
  } catch (err) {
    errorHandler(err, dispatch);
  }
};
export const deleteTaskSuccess = (payload) => ({type: DELETE_TASK_SUCCESS, payload});

function errorHandler(err, dispatch, errMsg) {
  if (err.response.status === 401) {
    localStorage.removeItem('token');
    dispatch(unauthorize());
  } else dispatch(requestError(errMsg || 'Ha ocurrido un error'));
}
