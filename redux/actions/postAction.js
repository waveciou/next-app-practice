import * as types from '../types';

export const fetchposts = () => dispatch => {
  dispatch({
    type: types.GET_POSTS,
    payload: ['1', '2', '3']
  })
};