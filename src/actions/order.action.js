import {
  ORDER_FETCHING,
  ORDER_SUCCESS,
  ORDER_FAILED,
  ORDER_CLEAR,
  server,
} from '../constants';
import swal from 'sweetalert';
import { httpClient } from './../utils/HttpClient';

export const setOrderStateToFetching = () => ({
  type: ORDER_FETCHING,
});

export const setOrderStateToFailed = () => ({
  type: ORDER_FAILED,
});
export const setOrderStateToClear = () => ({
  type: ORDER_CLEAR,
});
export const setOrderStateToSuccess = (payload) => ({
  type: ORDER_SUCCESS,
  payload,
});
export const clearState = () => {
  return (dispatch) => {
    dispatch(setOrderStateToClear());
  };
};

export const Index = () => {
  return async (dispatch) => {
    dispatch(setOrderStateToFetching);
    const response = await httpClient.get(
      process.env.REACT_APP_API_URL + server.ORDER_URL
    );
    if (response.data.result == 'success') {
      // console.log(response.data);
      dispatch(setOrderStateToSuccess(response.data.data));
    } else if (response.data.result === 'error') {
      dispatch(setOrderStateToFailed());
      swal('Error!', response.data.message, 'error');
    }
  };
};

export const remove = (id) => {
  return async (dispatch) => {
    console.log('remove');
    dispatch(setOrderStateToFetching());
    const response = await httpClient.delete(
      process.env.REACT_APP_API_URL + 'order/' + id
    );
    if (response.data.result == 'success') {
      dispatch(setOrderStateToSuccess());
      dispatch(Index());
    } else if (response.data.result === 'error') {
      dispatch(setOrderStateToFailed());
      swal('Error!', response.data.message, 'error');
    }
  };
};

export const getSingleOrder = (id) => {
  return async (dispatch) => {
    dispatch(setOrderStateToFetching());
    const response = await httpClient.get(
      process.env.REACT_APP_API_URL + 'order/' + id
    );
    if (response.data.result === 'success') {
      dispatch(setOrderStateToSuccess(response.data.data));
    } else if (response.data.result === 'error') {
      dispatch(setOrderStateToFailed());
      swal('Error!', response.data.message, 'error');
    }
  };
};

export const Update = (values, history) => {
  return async (dispatch) => {
    dispatch(setOrderStateToFetching());
    const response = await httpClient.put(
      process.env.REACT_APP_API_URL + 'order',
      values
    );
    if (response.data.result == 'success') {
      dispatch(setOrderStateToClear());
      history.goBack();
      dispatch(Index());
    } else if (response.data.result === 'error') {
      dispatch(setOrderStateToFailed());
      swal('Error!', response.data.message, 'error');
    }
  };
};

export const Back = (history) => {
  return (dispatch, getState) => {
    dispatch(setOrderStateToClear());
    history.goBack();
    dispatch(Index());
  };
};
