import {
    BAHAN_FETCHING,
    BAHAN_SUCCESS,
    BAHAN_FAILED,
    BAHAN_CLEAR,
    FETCHOPTION_SUCCESS,
  } from '../constants';
  import swal from 'sweetalert';
  import { httpClient } from './../utils/HttpClient';
  
  export const setBahanStateToFetching = () => ({
    type: BAHAN_FETCHING,
  });
  
  export const setBahanStateToFailed = () => ({
    type: BAHAN_FAILED,
  });
  export const setBahanStateToClear = () => ({
    type: BAHAN_CLEAR,
  });
  export const setBahanStateToSuccess = (payload) => ({
    type: BAHAN_SUCCESS,
    payload,
  });
  export const setFetchOptionStateToSuccess = (payload) => ({
    type: FETCHOPTION_SUCCESS,
    payload,
  });
  
  export const Index = () => {
    return async (dispatch) => {
      dispatch(setBahanStateToFetching());
      const response = await httpClient.get(
        process.env.REACT_APP_API_URL + 'bahan'
      );
      if (response.data.result == 'success') {
        // console.log(response.data);
        dispatch(setBahanStateToSuccess(response.data.data));
      } else if (response.data.result === 'error') {
        dispatch(setBahanStateToFailed());
        swal('Error!', response.data.message, 'error');
      }
    };
  };
  export const getDropdownProduct = () => {
    return async (dispatch) => {
      dispatch(setBahanStateToFetching());
      const response = await httpClient.get(
        process.env.REACT_APP_API_URL + 'bahan_getproduct'
      );
      if (response.data.result == 'success') {
        let result = response.data.data.flat().map((item) => {
          return {
            value: item._id,
            label: item.name,
          };
        });
  
        dispatch(setFetchOptionStateToSuccess(result));
      } else if (response.data.result === 'error') {
        dispatch(setBahanStateToFailed());
        swal('Error!', response.data.message, 'error');
      }
    };
  };
  export const getSingleBahan = (id) => {
    return async (dispatch) => {
      dispatch(setBahanStateToFetching());
      const response = await httpClient.get(
        process.env.REACT_APP_API_URL + 'bahan/' + id
      );
  
      if (response.data.result == 'success') {
        dispatch(getDropdownProduct()).then(() => {
          dispatch(setBahanStateToSuccess(response.data.data));
        });
      } else if (response.data.result === 'error') {
        dispatch(setBahanStateToFailed());
        swal('Error!', response.data.message, 'error');
      }
    };
  };
  export const Create = (values, history) => {
    return async (dispatch) => {
      dispatch(setBahanStateToFetching());
      const response = await httpClient.post(
        process.env.REACT_APP_API_URL + 'bahan',
        values
      );
      if (response.data.result == 'success') {
        dispatch(setBahanStateToSuccess(response.data));
        swal('Success!', response.data.message, 'success').then((value) => {
          dispatch(setBahanStateToClear());
          history.goBack();
          dispatch(Index());
        });
      } else if (response.data.result === 'error') {
        dispatch(setBahanStateToFailed());
        swal('Error!', response.data.message, 'error');
      }
    };
  };
  export const Update = (values, history) => {
    return async (dispatch) => {
      dispatch(setBahanStateToFetching());
      const response = await httpClient.put(
        process.env.REACT_APP_API_URL + 'bahan',
        values
      );
      if (response.data.result == 'success') {
        dispatch(setBahanStateToClear());
        history.goBack();
        dispatch(Index());
      } else if (response.data.result === 'error') {
        dispatch(setBahanStateToFailed());
        swal('Error!', response.data.message, 'error');
      }
    };
  };
  export const Remove = (id) => {
    return async (dispatch) => {
      console.log('remove');
      dispatch(setBahanStateToFetching());
      const response = await httpClient.delete(
        process.env.REACT_APP_API_URL + 'bahan/' + id
      );
      if (response.data.result == 'success') {
        dispatch(setBahanStateToSuccess());
        dispatch(Index());
      } else if (response.data.result === 'error') {
        dispatch(setBahanStateToFailed());
        swal('Error!', response.data.message, 'error');
      }
    };
  };
  export const clearState = () => {
    return (dispatch) => {
      dispatch(setBahanStateToClear());
    };
  };
  