/* eslint-disable default-param-last */
import {TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE} from '../actions/types';

const initialState = {
  loading: false,
  tasks: [],
  error: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case TASKS_REQUEST:
      return {...state, loading: true};
    case TASKS_SUCCESS:
      return {...state, tasks: payload, error: '', loading: false};
    case TASKS_FAILURE:
      return {...state, tasks: [], error: payload, loading: false};
    default:
      return state;
  }
};
