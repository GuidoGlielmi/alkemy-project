import {
  REQUEST_PENDING,
  REQUEST_FINISHED,
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
  SET_TASK_CREATOR,
} from '../actions/types';

const initialState = {
  loggedIn: !!localStorage.getItem('token'),
  username: localStorage.getItem('username') || '',
  isTeamLeader: !!localStorage.getItem('isTeamLeader'),
  teamID: localStorage.getItem('teamID') || '',
  tasks: [],
  taskByCreator: 'ALL',
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
    [REQUEST_FINISHED]: {...state, isLoading: false},
    [REQUEST_ERROR]: {
      ...state,
      error: true,
      userFeedbackMsg: action.payload,
    },
    [LOGIN_SUCCESS]: {
      ...state,
      loggedIn: true,
      username: action.payload?.username,
      isTeamLeader: action.payload?.isTeamLeader,
      teamID: action.payload?.teamID,
    },
    [LOGOUT]: initialState,
    [TASKS_SUCCESS]: {
      ...state,
      tasks: action.payload?.tasks,
      userFeedbackMsg: action.payload?.userFeedbackMsg,
    },
    [TASK_DATA_SUCCESS]: {
      ...state,
      statuses: action.payload?.status,
      priorities: action.payload?.importance,
    },
    [FORM_INFO_SUCCESS]: {
      ...state,
      roles: action.payload?.roles,
      continents: action.payload?.continents,
      regions: action.payload?.regions,
    },
    [REGISTER_SUCCESS]: {
      ...initialState,
      teamID: state.teamID || '',
      username: action.payload,
      justRegistered: true,
    },
    [CLEAR_JUST_REGISTERED]: {...state, justRegistered: false},
    [UNAUTHORIZE]: {...state, loggedIn: false, isLoading: false},
    [CLEAR_USER_FEEDBACK_MSG]: {
      ...state,
      userFeedbackMsg: '',
      error: false,
    },
    [SET_TASK_CREATOR]: {...state, taskByCreator: action.payload},
  };
  console.log(action.type, cases[action.type]);
  return cases[action.type] || state;
};
