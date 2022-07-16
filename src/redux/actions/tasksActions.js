import loginService from 'services/login';
import {formDataService, registerService} from 'services/register';
import {
  addTaskService,
  deleteTaskService,
  getMyTasksService,
  getAllTasksService,
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
  CLEAR_USER_FEEDBACK_MSG,
} from './types';

export const requestPending = () => ({type: REQUEST_PENDING});
export const requestError = (payload) => ({type: REQUEST_ERROR, payload});

export const login = (values) => async (dispatch) => {
  dispatch(requestPending());
  try {
    const {token, username, isTeamLeader, teamID} = await loginService(values);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('teamID', teamID);
    isTeamLeader && localStorage.setItem('isTeamLeader', isTeamLeader);
    dispatch(loginSuccess({username, isTeamLeader, teamID}));
  } catch (err) {
    errorHandler({
      err,
      dispatch,
      errMsg:
        (err.response.status === 404 || err.response.status === 401) &&
        'Usuario o contraseña incorrectos',
    });
  }
};

export const loginSuccess = (payload) => ({type: LOGIN_SUCCESS, payload});
export const logout = () => {
  localStorage.clear();
  return {type: LOGOUT};
};
export const unauthorize = () => ({type: UNAUTHORIZE});

export const getFormInfo = () => async (dispatch) => {
  dispatch(requestPending());
  try {
    const {Rol: roles, continente: continents, region: regions} = await formDataService();
    dispatch(formInfoSuccess({roles, continents, regions}));
  } catch (err) {
    errorHandler({err, dispatch});
  }
};
export const formInfoSuccess = (payload) => ({type: FORM_INFO_SUCCESS, payload});
export const register = (values) => async (dispatch) => {
  dispatch(requestPending());
  try {
    // await registerService(values);
    localStorage.setItem('username', values.userName);
    dispatch(registerSuccess(values.userName));
  } catch (err) {
    errorHandler({err, dispatch, errMsg: err.response.status === 409 && 'El email ya está en uso'});
  }
};
export const registerSuccess = (payload) => ({type: REGISTER_SUCCESS, payload});
export const clearJustRegistered = () => ({type: CLEAR_JUST_REGISTERED});

export const getMyTasks = () => async (dispatch) => {
  dispatch(requestPending());
  // avoid using async await with several independent (from eachother) api calls, because there is no need to wait for each of them to complete before calling the next one
  taskDataService()
    .then((data) => dispatch(taskDataSuccess(data)))
    .catch((err) => errorHandler({err, dispatch}));
  getMyTasksService()
    .then((tasks) => dispatch(tasksSuccess(tasks)))
    .catch((err) => errorHandler({err, dispatch}));
};

export const getAllTasks = () => async (dispatch) => {
  dispatch(requestPending());
  // avoid using async await with several independent (from eachother) api calls, because there is no need to wait for each of them to complete before calling the next one
  taskDataService()
    .then((data) => dispatch(taskDataSuccess(data)))
    .catch((err) => errorHandler({err, dispatch}));
  getAllTasksService()
    .then((tasks) => dispatch(tasksSuccess(tasks)))
    .catch((err) => errorHandler({err, dispatch}));
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
    errorHandler({err, dispatch});
  }
};
export const addTaskSuccess = (payload) => ({type: ADD_TASK_SUCCESS, payload});
export const updateTask = (id, task) => async (dispatch) => {
  dispatch(requestPending());
  try {
    await updateTaskService(id, task);
    dispatch(updateTaskSuccess({id, task}));
  } catch (err) {
    errorHandler({err, dispatch});
  }
};
export const updateTaskSuccess = (payload) => ({type: UPDATE_TASK_SUCCESS, payload});
export const deleteTask = (id) => async (dispatch) => {
  dispatch(requestPending());
  try {
    await deleteTaskService(id);
    dispatch(deleteTaskSuccess(id));
  } catch (err) {
    errorHandler({err, dispatch});
  }
};
export const deleteTaskSuccess = (payload) => ({type: DELETE_TASK_SUCCESS, payload});
export const clearUserFeedbackMsg = () => ({type: CLEAR_USER_FEEDBACK_MSG});

function errorHandler({err, dispatch, errMsg}) {
  if (!errMsg && err.response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('isTeamLeader');
    dispatch(unauthorize());
  } else dispatch(requestError(errMsg || ''));
}
