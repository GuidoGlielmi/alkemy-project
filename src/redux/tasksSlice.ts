import {
  isPending,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  isFulfilled,
  isRejected,
} from '@reduxjs/toolkit';
import {FormikState} from 'formik';
import goScrum, {IRegisterData, ITask, ITaskData, IUser} from 'services/goScrum';
import {
  clearSessionService,
  getSessionService,
  registerSessionService,
  saveSessionService,
  Session,
  unauthorizeSessionService,
} from 'services/session';

const genericErrorMsg = 'Ha ocurrido un error';

export interface State extends Session, IRegisterData, ITaskData {
  tasks: ITask[];
  taskByCreator: string;
  feedbackMsg: string;
  errorFeedbackMsg: string;
  justRegistered: boolean;
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
  justRegistered: false,
  feedbackMsg: '',
  errorFeedbackMsg: '',
  isLoading: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    requestFinished(state) {
      state.isLoading = false;
    },
    logout() {
      clearSessionService();
      return {...initialState, ...getSessionService()};
    },
    tasksSuccess(state, action: PayloadAction<{tasks: ITask[]; feedbackMsg: string}>) {
      state.tasks = action.payload?.tasks;
      state.feedbackMsg = action.payload?.feedbackMsg;
    },
    taskDataSuccess(state, action: PayloadAction<ITaskData>) {
      state.status = action.payload?.status;
      state.importance = action.payload?.importance;
    },
    clearJustRegistered(state) {
      state.justRegistered = false;
    },
    clearUserFeedbackMsg(state) {
      state.feedbackMsg = '';
      state.errorFeedbackMsg = '';
    },
    setTaskCreator(state, action: PayloadAction<string>) {
      state.taskByCreator = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const {
          token,
          user: {userName, role, teamID},
        } = action.payload;
        const isTeamLeader = role === 'Team Leader';
        saveSessionService({token, userName, isTeamLeader, teamID});
        state.userName = userName;
        state.isTeamLeader = isTeamLeader;
        state.isLoggedIn = true;
        state.teamID = teamID;
      })
      .addCase(login.rejected, (state, action) => {
        const errMsg = action.error.message;
        if (errMsg === 'NOT FOUND' || errMsg === 'UNAUTHORIZED')
          state.errorFeedbackMsg = 'Usuario o contraseña incorrectos';
      })
      .addCase(getFormInfo.fulfilled, (state, {payload: formInfo}) => {
        state.Rol = formInfo.Rol;
        state.continente = formInfo.continente;
        state.region = formInfo.region;
      })
      .addCase(register.fulfilled, (state, {payload: userName}) => {
        registerSessionService(userName);
        return {
          ...state,
          ...getSessionService(),
          teamID: state.teamID || '',
          userName,
          justRegistered: true,
        };
      })
      .addCase(register.rejected, (state, action) => {
        const errMsg = action.error.message;
        if (errMsg === 'CONFLICT') state.errorFeedbackMsg = 'El email ya está en uso';
      })
      .addMatcher(isPending, state => {
        state.isLoading = true;
      })
      .addMatcher(isRejected, (state, action) => {
        state.isLoading = false;
        if (action.type.includes('login')) return;
        const errMsg = action.error.message;
        if (errMsg === 'UNAUTHORIZED') {
          unauthorizeSessionService();
          state.isLoggedIn = false;
          return;
        }
        state.errorFeedbackMsg ||= genericErrorMsg;
      })
      .addMatcher(isAFulfilledAction, state => {
        state.isLoading = false;
      });
  },
});
export default tasksSlice;
const {actions} = tasksSlice;

const login = createAsyncThunk(
  'tasks/login',
  async (values: {userName: string; password: string}) => goScrum.login(values),
);
const getFormInfo = createAsyncThunk('tasks/formInfo', async () => goScrum.registerFormData());

const register = createAsyncThunk('tasks/register', async (user: IUser) => {
  await goScrum.register(user);
  return user.userName;
});

const getMyTasks = createAsyncThunk('tasks/myTasks', async (feedbackMsg: string, {dispatch}) => {
  const p1 = goScrum.getTaskData();
  p1.then(data => dispatch(actions.taskDataSuccess(data)));
  const p2 = goScrum.getMyTasks();
  p2.then(tasks => dispatch(actions.tasksSuccess({tasks, feedbackMsg})));
  return Promise.all([p1, p2]).then(() => dispatch(actions.requestFinished()));
});

const getAllTasks = createAsyncThunk('tasks/allTasks', async (feedbackMsg: string, {dispatch}) => {
  const p1 = goScrum.getTaskData();
  p1.then(data => dispatch(actions.taskDataSuccess(data)));
  const p2 = goScrum.getAllTasks();
  p2.then(tasks => dispatch(actions.tasksSuccess({tasks, feedbackMsg})));
  return Promise.all([p1, p2]).then(() => dispatch(actions.requestFinished()));
});
const getSelectedTasks =
  (feedbackMsg = '') =>
  (dispatch: any, getState: any) => {
    const {taskByCreator} = getState();
    dispatch(taskByCreator === 'ALL' ? getAllTasks(feedbackMsg) : getMyTasks(feedbackMsg));
  };

const addTask = createAsyncThunk(
  'tasks/addTask',
  async (
    {task, resetForm}: {task: ITask; resetForm: (nextState?: Partial<FormikState<ITask>>) => void},
    {dispatch},
  ) => {
    await goScrum.addTask(task);
    resetForm();
    dispatch(getSelectedTasks('La tarea ha sido creada exitosamente'));
  },
);
const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({id, task}: {id: string; task: ITask}, {dispatch}) => {
    await goScrum.updateTask(id, task);
    dispatch(getSelectedTasks('La tarea ha sido actualizada'));
  },
);
const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string, {dispatch}) => {
  await goScrum.deleteTask(id);
  dispatch(getSelectedTasks('La tarea ha sido borrada exitosamente'));
});

const setTaskCreator = (taskCreator: string) => async (dispatch: any) => {
  dispatch(taskCreator === 'ALL' ? getAllTasks('') : getMyTasks(''));
  dispatch(actions.setTaskCreator(taskCreator));
};

const isAFulfilledAction = isFulfilled(
  login,
  getFormInfo,
  register,
  addTask,
  updateTask,
  deleteTask,
);
const {clearJustRegistered, clearUserFeedbackMsg, logout} = actions;

export {
  clearJustRegistered,
  clearUserFeedbackMsg,
  logout,
  login,
  getFormInfo,
  register,
  getMyTasks,
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
  setTaskCreator,
};
