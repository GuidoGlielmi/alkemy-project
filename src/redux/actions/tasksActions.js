import loginService from 'services/login';
import {formDataService, registerService} from 'services/register';
import {
  saveSessionService,
  clearSessionService,
  registerSessionService,
  unauthorizeSessionService,
} from 'services/session';
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
  REQUEST_FINISHED,
  REQUEST_ERROR,
  TASKS_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  FORM_INFO_SUCCESS,
  REGISTER_SUCCESS,
  UNAUTHORIZE,
  CLEAR_JUST_REGISTERED,
  TASK_DATA_SUCCESS,
  CLEAR_USER_FEEDBACK_MSG,
  SET_TASK_CREATOR,
} from './types';

const requestPending = () => ({type: REQUEST_PENDING});
const requestError = (payload) => ({type: REQUEST_ERROR, payload});
const requestFinished = () => ({type: REQUEST_FINISHED});

export const login = (values) => async (dispatch) => {
  dispatch(requestPending());
  try {
    const {token, username, isTeamLeader, teamID} = await loginService(values);
    saveSessionService({token, username, isTeamLeader, teamID});
    dispatch(loginSuccess({username, isTeamLeader, teamID}));
  } catch (err) {
    let errMsg;
    if (err.response.status === 404 || err.response.status === 401)
      errMsg = 'Usuario o contraseña incorrectos';
    dispatch(errorHandler(err, errMsg));
  } finally {
    dispatch(requestFinished());
  }
};

const loginSuccess = (payload) => ({type: LOGIN_SUCCESS, payload});
export const logout = () => {
  clearSessionService();
  return {type: LOGOUT};
};
const unauthorize = () => ({type: UNAUTHORIZE});

export const getFormInfo = () => async (dispatch) => {
  dispatch(requestPending());
  try {
    const {Rol: roles, continente: continents, region: regions} = await formDataService();
    dispatch(formInfoSuccess({roles, continents, regions}));
  } catch (err) {
    dispatch(errorHandler(err));
  } finally {
    dispatch(requestFinished());
  }
};
const formInfoSuccess = (payload) => ({type: FORM_INFO_SUCCESS, payload});
export const register = (user) => async (dispatch) => {
  dispatch(requestPending());
  try {
    await registerService(user);
    registerSessionService(user.userName);
    dispatch(registerSuccess(user.userName));
  } catch (err) {
    dispatch(errorHandler(err));
  } finally {
    dispatch(requestFinished());
  }
};
const registerSuccess = (payload) => ({type: REGISTER_SUCCESS, payload});
export const clearJustRegistered = () => ({type: CLEAR_JUST_REGISTERED});

export const getMyTasks =
  (userFeedbackMsg = '') =>
  async (dispatch) => {
    dispatch(requestPending());
    const p1 = taskDataService();
    p1.then((data) => dispatch(taskDataSuccess(data)));
    const p2 = getMyTasksService();
    p2.then((tasks) => dispatch(tasksSuccess({tasks, userFeedbackMsg})));
    Promise.all([p1, p2])
      .then(() => dispatch(requestFinished()))
      .catch((err) => dispatch(errorHandler(err)));
  };

export const getAllTasks =
  (userFeedbackMsg = '') =>
  async (dispatch) => {
    dispatch(requestPending());
    // avoid using async await with several independent (from eachother) api calls, because there is no need to wait for each of them to complete before calling the next one
    const p1 = taskDataService();
    p1.then((data) => dispatch(taskDataSuccess(data)));
    const p2 = getAllTasksService();
    p2.then((tasks) => dispatch(tasksSuccess({tasks, userFeedbackMsg})));
    Promise.all([p1, p2])
      .then(() => dispatch(requestFinished()))
      .catch((err) => dispatch(errorHandler(err)));
  };

const tasksSuccess = (payload) => ({type: TASKS_SUCCESS, payload});
const taskDataSuccess = (payload) => ({type: TASK_DATA_SUCCESS, payload});
export const addTask = (task, resetForm) => async (dispatch) => {
  dispatch(requestPending());
  try {
    await addTaskService(task);
    resetForm();
    dispatch(getSelectedTasks('La tarea ha sido creada exitosamente'));
  } catch (err) {
    dispatch(errorHandler(err));
  } finally {
    dispatch(requestFinished());
  }
};
export const updateTask = (id, task) => async (dispatch) => {
  dispatch(requestPending());
  try {
    await updateTaskService(id, task);
    dispatch(getSelectedTasks('La tarea ha sido actualizada'));
  } catch (err) {
    dispatch(errorHandler(err));
  } finally {
    dispatch(requestFinished());
  }
};
export const deleteTask = (id) => async (dispatch) => {
  dispatch(requestPending());
  try {
    await deleteTaskService(id);
    dispatch(getSelectedTasks('La tarea ha sido borrada exitosamente'));
  } catch (err) {
    dispatch(errorHandler(err));
  } finally {
    dispatch(requestFinished());
  }
};
export const clearUserFeedbackMsg = () => ({type: CLEAR_USER_FEEDBACK_MSG});
export const setTaskCreator = (payload) => (dispatch) => {
  dispatch(payload === 'ALL' ? getAllTasks() : getMyTasks());
  dispatch({type: SET_TASK_CREATOR, payload});
};

const getSelectedTasks = (userFeedbackMsg) => (dispatch, getState) => {
  const {taskByCreator} = getState();
  dispatch(taskByCreator === 'ALL' ? getAllTasks(userFeedbackMsg) : getMyTasks(userFeedbackMsg));
};

const errorHandler =
  (err, errMsg = '') =>
  async (dispatch) => {
    if (!errMsg && err.status === 401) {
      unauthorizeSessionService();
      dispatch(unauthorize());
    } else if (err.status === 409) dispatch(requestError('El email ya está en uso'));
    else dispatch(requestError(errMsg));
  };
