import twitch from '../api/Twitch';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from '../actions/actionTypes';

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createTwitch = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const res = await twitch.post('/twitch', { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: res.data });
  history.push('/');
};

export const fetchStreams = () => async dispatch => {
  const res = await twitch.get('twitch');

  dispatch({ type: FETCH_STREAMS, payload: res.data });
};

export const fetchStream = id => async dispatch => {
  const res = await twitch.get(`/twitch/${id}`);

  dispatch({ type: FETCH_STREAM, payload: res.data });
};

export const editTwitch = (id, formValues) => async dispatch => {
  const res = await twitch.patch(`/twitch/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: res.data });
  history.push('/');
};

export const deleteTwitch = id => async dispatch => {
  await twitch.delete(`/twitch/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};
