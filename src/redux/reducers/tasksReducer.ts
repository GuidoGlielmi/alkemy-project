import {IRegisterData, ITask, ITaskData} from 'services/goScrum';
import {getSessionService, Session} from 'services/session';
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

export interface State extends Session, IRegisterData, ITaskData {
  tasks: ITask[];
  taskByCreator: string;
  error: boolean;
  justRegistered: boolean;
  userFeedbackMsg: string;
  isLoading: boolean;
}

const initialState: State = {
  ...getSessionService(),
  tasks: [],
  taskByCreator: 'ALL',
  Rol: [],
  continente: [],
  region: [],
  status: [],
  importance: [],
  error: false,
  justRegistered: false,
  userFeedbackMsg: '',
  isLoading: false,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export default (state = initialState, action: any): State => {
  const cases = {
    [REQUEST_PENDING]: {...state, isLoading: true},
    [REQUEST_FINISHED]: {...state, isLoading: false},
    [REQUEST_ERROR]: {
      ...state,
      error: true,
      userFeedbackMsg: action.payload,
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
      userFeedbackMsg: action.payload?.userFeedbackMsg,
    },
    [TASK_DATA_SUCCESS]: {
      ...state,
      status: action.payload?.status,
      importance: action.payload?.importance,
    },
    [FORM_INFO_SUCCESS]: {
      ...state,
      Rol: action.payload?.Rol,
      continente: action.payload?.continente,
      region: action.payload?.region,
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
      userFeedbackMsg: '',
      error: false,
    },
    [SET_TASK_CREATOR]: {...state, taskByCreator: action.payload},
  };
  // console.log(action.type, cases[action.type]);
  return cases[action.type] || state;
};
