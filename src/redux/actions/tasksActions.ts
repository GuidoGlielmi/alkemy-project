import {FormikState} from 'formik';
import {
  saveSessionService,
  clearSessionService,
  registerSessionService,
  unauthorizeSessionService,
  Session,
} from 'services/session';
import GoScrum, {IRegisterData, ITask, ITaskData, IUser} from 'services/goScrum';
import RequestError from 'services/RequestError';

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

const unauthorize = () => ({type: UNAUTHORIZE});
const requestError = (payload: string) => ({type: REQUEST_ERROR, payload});
const errorHandler =
  (err: RequestError, errMsg = '') =>
  async (dispatch: any) => {
    if (!errMsg && err.status === 401) {
      unauthorizeSessionService();
      dispatch(unauthorize());
    } else if (err.status === 409) dispatch(requestError('El email ya está en uso'));
    else dispatch(requestError(errMsg));
  };

const requestPending = () => ({type: REQUEST_PENDING});
const requestFinished = () => ({type: REQUEST_FINISHED});
const loginSuccess = (payload: Session) => ({type: LOGIN_SUCCESS, payload});

export const login = (values: {userName: string; password: string}) => async (dispatch: any) => {
  dispatch(requestPending());
  try {
    const {
      token,
      user: {userName, Rol, teamID},
    } = await GoScrum.login(values);
    const isTeamLeader = Rol === 'Team Leader';
    saveSessionService({token, userName, isTeamLeader, teamID});
    dispatch(loginSuccess({userName, isTeamLeader, teamID}));
  } catch (err) {
    let errMsg: string;
    if (err.response.status === 404 || err.response.status === 401)
      errMsg = 'Usuario o contraseña incorrectos';
    dispatch(errorHandler(err, errMsg));
  } finally {
    dispatch(requestFinished());
  }
};

export const logout = () => {
  clearSessionService();
  return {type: LOGOUT};
};

const formInfoSuccess = (payload: IRegisterData) => ({type: FORM_INFO_SUCCESS, payload});
export const getFormInfo = () => async (dispatch: any) => {
  dispatch(requestPending());
  try {
    const values = await GoScrum.registerFormData();
    dispatch(formInfoSuccess(values));
  } catch (err) {
    dispatch(errorHandler(err));
  } finally {
    dispatch(requestFinished());
  }
};
const registerSuccess = (userName: string) => ({type: REGISTER_SUCCESS, payload: userName});
export const register = (user: IUser) => async (dispatch: any) => {
  dispatch(requestPending());
  try {
    await GoScrum.register(user);
    registerSessionService(user.userName);
    dispatch(registerSuccess(user.userName));
  } catch (err) {
    dispatch(errorHandler(err));
  } finally {
    dispatch(requestFinished());
  }
};
export const clearJustRegistered = () => ({type: CLEAR_JUST_REGISTERED});

const tasksSuccess = (payload: {tasks: ITask[]; userFeedbackMsg: string}) => ({
  type: TASKS_SUCCESS,
  payload,
});
const taskDataSuccess = (payload: ITaskData) => ({type: TASK_DATA_SUCCESS, payload});
export const getMyTasks =
  (userFeedbackMsg = '') =>
  async (dispatch: any) => {
    dispatch(requestPending());
    const p1 = GoScrum.getTaskData();
    p1.then(data => dispatch(taskDataSuccess(data)));
    const p2 = GoScrum.getMyTasks();
    p2.then(tasks => dispatch(tasksSuccess({tasks, userFeedbackMsg})));
    Promise.all([p1, p2])
      .then(() => dispatch(requestFinished()))
      .catch(err => dispatch(errorHandler(err)));
  };

export const getAllTasks =
  (userFeedbackMsg = '') =>
  async (dispatch: any) => {
    dispatch(requestPending());
    const p1 = GoScrum.getTaskData();
    p1.then(data => dispatch(taskDataSuccess(data)));
    const p2 = GoScrum.getAllTasks();
    p2.then(tasks => dispatch(tasksSuccess({tasks, userFeedbackMsg})));
    Promise.all([p1, p2])
      .then(() => dispatch(requestFinished()))
      .catch(err => dispatch(errorHandler(err)));
  };

const getSelectedTasks = (userFeedbackMsg: string) => (dispatch: any, getState: any) => {
  const {taskByCreator} = getState();
  dispatch(taskByCreator === 'ALL' ? getAllTasks(userFeedbackMsg) : getMyTasks(userFeedbackMsg));
};

export const addTask =
  (task: ITask, resetForm: (nextState?: Partial<FormikState<any>>) => void) =>
  async (dispatch: any) => {
    dispatch(requestPending());
    try {
      await GoScrum.addTask(task);
      resetForm();
      dispatch(getSelectedTasks('La tarea ha sido creada exitosamente'));
    } catch (err) {
      dispatch(errorHandler(err));
    } finally {
      dispatch(requestFinished());
    }
  };
export const updateTask = (task: ITask) => async (dispatch: any) => {
  dispatch(requestPending());
  try {
    await GoScrum.updateTask(task);
    dispatch(getSelectedTasks('La tarea ha sido actualizada'));
  } catch (err) {
    dispatch(errorHandler(err));
  } finally {
    dispatch(requestFinished());
  }
};
export const deleteTask = (id: string) => async (dispatch: any) => {
  dispatch(requestPending());
  try {
    await GoScrum.deleteTask(id);
    dispatch(getSelectedTasks('La tarea ha sido borrada exitosamente'));
  } catch (err) {
    dispatch(errorHandler(err));
  } finally {
    dispatch(requestFinished());
  }
};
export const clearUserFeedbackMsg = () => ({type: CLEAR_USER_FEEDBACK_MSG});
export const setTaskCreator = (payload: string) => (dispatch: any) => {
  dispatch(payload === 'ALL' ? getAllTasks() : getMyTasks());
  dispatch({type: SET_TASK_CREATOR, payload});
};
