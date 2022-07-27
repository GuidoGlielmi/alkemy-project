import {getSessionService} from 'services/session';
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
  CLEAR_USER_FEEDBACK_MSG,
  SET_TASK_CREATOR,
} from '../actions/types';

const initialState = {
  ...getSessionService(),
  tasks: [],
  taskByCreator: 'ALL',
  roles: [],
  continents: [],
  regions: [],
  statuses: [],
  priorities: [],
  error: false,
  justRegistered: false,
  feedbackMsg: '',
  errorFeedbackMsg: '',
  isLoading: false,
};

export default (state = initialState, action) => {
  const cases = {
    [REQUEST_PENDING]: {...state, isLoading: true},
    [REQUEST_FINISHED]: {...state, isLoading: false},
    [REQUEST_ERROR]: {
      ...state,
      error: true,
      errorFeedbackMsg: action.payload,
      isLoading: false,
    },
    [LOGIN_SUCCESS]: {
      ...state,
      isLoggedIn: true,
      username: action.payload?.username,
      isTeamLeader: action.payload?.isTeamLeader,
      teamID: action.payload?.teamID,
    },
    [LOGOUT]: {...initialState, ...getSessionService()},
    [TASKS_SUCCESS]: {
      ...state,
      tasks: action.payload?.tasks,
      feedbackMsg: action.payload?.feedbackMsg,
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
      ...getSessionService(),
      teamID: state.teamID || '',
      username: action.payload,
      justRegistered: true,
    },
    [CLEAR_JUST_REGISTERED]: {...state, justRegistered: false},
    [UNAUTHORIZE]: {...state, isLoggedIn: false, isLoading: false},
    [CLEAR_USER_FEEDBACK_MSG]: {
      ...state,
      feedbackMsg: '',
      errorFeedbackMsg: '',
      error: false,
    },
    [SET_TASK_CREATOR]: {...state, taskByCreator: action.payload},
  };
  // console.log(action.type, cases[action.type]);
  return cases[action.type] || state;
};
