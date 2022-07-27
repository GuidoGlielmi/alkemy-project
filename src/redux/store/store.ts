import {configureStore} from '@reduxjs/toolkit';
import tasksReducer from 'redux/reducers/tasksReducer';

const store = configureStore({
  reducer: tasksReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
