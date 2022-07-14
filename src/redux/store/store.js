import {applyMiddleware} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {composeWithDevTools} from '@redux-devtools/extension';
import tasksReducer from 'redux/reducers/tasksReducer';

export default configureStore({reducer: tasksReducer}, composeWithDevTools(applyMiddleware(thunk)));
