import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {State} from 'redux/reducers/tasksReducer';
import {IRegisterData, ITask, ITaskData} from 'services/goScrum';
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
} from './types';

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

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    [REQUEST_PENDING]: (state) => {
      state.isLoading = true;
    },
    [REQUEST_FINISHED]: (state) => {
      state.isLoading = false;
    },
    [REQUEST_ERROR]: (state, action: PayloadAction<string>) => {
      state.error = true;
      state.userFeedbackMsg = action.payload;
      state.isLoading = false;
    },
    [LOGIN_SUCCESS]: (
      state,
      action: PayloadAction<{userName: string; isTeamLeader: boolean; teamID: string}>,
    ) => {
      state.isLoggedIn = true;
      state.userName = action.payload?.userName;
      state.isTeamLeader = action.payload?.isTeamLeader;
      state.teamID = action.payload?.teamID;
    },
    [LOGOUT]: () => ({...getSessionService(), ...initialState}),
    [TASKS_SUCCESS]: (state, action: PayloadAction<{tasks: ITask[]; userFeedbackMsg: string}>) => {
      state.tasks = action.payload?.tasks;
      state.userFeedbackMsg = action.payload?.userFeedbackMsg;
    },
    [TASK_DATA_SUCCESS]: (state, action: PayloadAction<ITaskData>) => {
      state.status = action.payload?.status;
      state.importance = action.payload?.importance;
    },
    [FORM_INFO_SUCCESS]: (state, action: PayloadAction<IRegisterData>) => {
      state.Rol = action.payload?.Rol;
      state.continente = action.payload?.continente;
      state.region = action.payload?.region;
    },
    [REGISTER_SUCCESS]: (state, action: PayloadAction<string>) => ({
      ...state,
      ...getSessionService(),
      teamID: state.teamID || '',
      userName: action.payload,
      justRegistered: true,
    }),
    [CLEAR_JUST_REGISTERED]: (state) => {
      state.justRegistered = false;
    },
    [UNAUTHORIZE]: (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    [CLEAR_USER_FEEDBACK_MSG]: (state) => {
      state.userFeedbackMsg = '';
      state.error = false;
    },
    [SET_TASK_CREATOR]: (state, action: PayloadAction<string>) => {
      state.taskByCreator = action.payload;
    },
  },
});

export default tasksSlice;
