import {configureStore} from '@reduxjs/toolkit';
// import tasksReducer from 'redux/reducers/tasksReducer';
import tasksSlice from '../slices/tasksSlice';

const store = configureStore({
  // reducer: tasksReducer,
  reducer: tasksSlice.reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
