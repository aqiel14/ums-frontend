import {
  MACHINE_FETCHING,
  MACHINE_SUCCESS,
  MACHINE_FAILED,
  MACHINE_CLEAR,
} from '../constants';
import swal from 'sweetalert';
import { httpClient } from './../utils/HttpClient';

export const setMachineStateToFetching = () => ({
  type: MACHINE_FETCHING,
});

export const setMachineStateToFailed = () => ({
  type: MACHINE_FAILED,
});
export const setMachineStateToClear = () => ({
  type: MACHINE_CLEAR,
});
export const setMachineStateToSuccess = (payload) => ({
  type: MACHINE_SUCCESS,
  payload,
});

export const Index = () => {
  return async (dispatch) => {
    dispatch(setMachineStateToFetching());
    const response = await httpClient.get(
      process.env.REACT_APP_API_URL + 'machine'
    );
    if (response.data.result == 'success') {
      // console.log(response.data);
      dispatch(setMachineStateToSuccess(response.data.data));
    } else if (response.data.result === 'error') {
      dispatch(setMachineStateToFailed());
      swal('Error!', response.data.message, 'error');
    }
  };
};

export const Create = (values, history) => {
  return async (dispatch) => {
    dispatch(setMachineStateToFetching());
    const response = await httpClient.post(
      process.env.REACT_APP_API_URL + 'machine',
      values
    );
    if (response.data.result == 'success') {
      dispatch(setMachineStateToSuccess(response.data));
      swal('Success!', response.data.message, 'success').then((value) => {
        dispatch(setMachineStateToClear());
        history.goBack();
        dispatch(Index());
      });
    } else if (response.data.result === 'error') {
      dispatch(setMachineStateToFailed());
      swal('Error!', response.data.message, 'error');
    }
  };
};
export const getSingleMachine = (id) => {
  return async (dispatch) => {
    dispatch(setMachineStateToFetching());
    const response = await httpClient.get(
      process.env.REACT_APP_API_URL + 'machine/' + id
    );
    if (response.data.result == 'success') {
      dispatch(setMachineStateToSuccess(response.data.data));
    } else if (response.data.result === 'error') {
      dispatch(setMachineStateToFailed());
      swal('Error!', response.data.message, 'error');
    }
  };
};
export const Update = (values, history) => {
  return async (dispatch) => {
    dispatch(setMachineStateToFetching());
    const response = await httpClient.put(
      process.env.REACT_APP_API_URL + 'machine',
      values
    );
    if (response.data.result == 'success') {
      dispatch(setMachineStateToClear());
      history.goBack();
      dispatch(Index());
    } else if (response.data.result === 'error') {
      dispatch(setMachineStateToFailed());
      swal('Error!', response.data.message, 'error');
    }
  };
};
export const Remove = (id) => {
  return async (dispatch) => {
    console.log('remove');
    dispatch(setMachineStateToFetching());
    const response = await httpClient.delete(
      process.env.REACT_APP_API_URL + 'machine/' + id
    );
    if (response.data.result == 'success') {
      dispatch(setMachineStateToSuccess());
      dispatch(Index());
    } else if (response.data.result === 'error') {
      dispatch(setMachineStateToFailed());
      swal('Error!', response.data.message, 'error');
    }
  };
};
export const clearState = () => {
  return (dispatch) => {
    dispatch(setMachineStateToClear());
  };
};

