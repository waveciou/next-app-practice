/*
  把所有的 Reducer 都集中在這邊引入，需要使用 combineReducers
 */

import { combineReducers } from 'redux';
import { postReducer } from './postReducer';

export default combineReducers({
  post: postReducer
});