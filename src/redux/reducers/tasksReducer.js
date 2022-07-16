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
  TASK_DATA_SUCCESS,
  ADD_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  CLEAR_USER_FEEDBACK_MSG,
} from '../actions/types';

const initialState = {
  loggedIn: !!localStorage.getItem('token'),
  username: localStorage.getItem('username') || '',
  isTeamLeader: !!localStorage.getItem('isTeamLeader'),
  isLoading: false,
  tasks: [],
  roles: [],
  continents: [],
  regions: [],
  statuses: [],
  priorities: [],
  error: false,
  justRegistered: false,
  userFeedbackMsg: '',
};

export default (state = initialState, action) => {
  const cases = {
    [REQUEST_PENDING]: {...state, isLoading: true},
    [REQUEST_ERROR]: {
      ...state,
      error: true,
      userFeedbackMsg: action.payload,
      isLoading: false,
    },
    [LOGIN_SUCCESS]: {
      ...state,
      loggedIn: true,
      username: action.payload?.username,
      isTeamLeader: action.payload?.isTeamLeader,
      isLoading: false,
    },
    [LOGOUT]: initialState,
    [TASKS_SUCCESS]: {...state, tasks: action.payload, isLoading: false},
    [TASK_DATA_SUCCESS]: {
      ...state,
      statuses: action.payload?.status,
      priorities: action.payload?.importance,
      isLoading: false,
    },
    [ADD_TASK_SUCCESS]: {
      ...state,
      tasks: [...state.tasks, action.payload],
      userFeedbackMsg: 'La tarea ha sido creada exitosamente',
      isLoading: false,
    },
    [UPDATE_TASK_SUCCESS]: {
      ...state,
      tasks: state.tasks.map((t) =>
        t._id === action.payload?.id ? {...t, ...action.payload?.task} : t,
      ),
      isLoading: false,
    },
    [DELETE_TASK_SUCCESS]: {
      ...state,
      tasks: state.tasks.filter((t) => t._id !== action.payload),
      userFeedbackMsg: 'La tarea ha sido borrada exitosamente',
      isLoading: false,
    },
    [FORM_INFO_SUCCESS]: {
      ...state,
      roles: action.payload?.roles,
      continents: action.payload?.continents,
      regions: action.payload?.regions,
      isLoading: false,
    },
    [REGISTER_SUCCESS]: {
      ...state,
      username: action.payload,
      justRegistered: true,
      isLoading: false,
    },
    [CLEAR_JUST_REGISTERED]: {...state, justRegistered: false},
    [UNAUTHORIZE]: {...state, loggedIn: false, isLoading: false},
    [CLEAR_USER_FEEDBACK_MSG]: {
      ...state,
      userFeedbackMsg: '',
      error: false,
    },
  };
  return cases[action.type] || state;
};
