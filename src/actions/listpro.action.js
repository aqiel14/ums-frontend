import {
  LISTPRO_FETCHING,
  LISTPRO_SUCCESS,
  LISTPRO_FAILED,
  LISTPRO_CLEAR,
  FETCHOPTION_SUCCESS,
} from '../constants';
import swal from 'sweetalert';
import { httpClient } from './../utils/HttpClient';

export const setListproStateToFetching = () => ({
  type: LISTPRO_FETCHING,
});

export const setListproStateToFailed = () => ({
  type: LISTPRO_FAILED,
});
export const setListproStateToClear = () => ({
  type: LISTPRO_CLEAR,
});
export const setListproStateToSuccess = (payload) => ({
  type: LISTPRO_SUCCESS,
  payload,
});
export const setFetchOptionStateToSuccess = (payload) => ({
  type: FETCHOPTION_SUCCESS,
  payload,
});

export const Index = () => {
  return async (dispatch) => {
    dispatch(setListproStateToFetching());
    const response = await httpClient.get(
      process.env.REACT_APP_API_URL + 'listpro'
    );
    if (response.data.result == 'success') {
      // console.log(response.data);
      dispatch(setListproStateToSuccess(response.data.data));
    } else if (response.data.result === 'error') {
      dispatch(setListproStateToFailed());
      swal('Error!', response.data.message, 'error');
    }
  };
};
export const getDropdownProduct = () => {
  return async (dispatch) => {
    dispatch(setListproStateToFetching());
    const response = await httpClient.get(
      process.env.REACT_APP_API_URL + 'listpro_getproduct'
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
      dispatch(setListproStateToFailed());
      swal('Error!', response.data.message, 'error');
    }
  };
};
export const getSingleListpro = (id) => {
  return async (dispatch) => {
    dispatch(setListproStateToFetching());
    const response = await httpClient.get(
      process.env.REACT_APP_API_URL + 'listpro/' + id
    );

    if (response.data.result == 'success') {
      dispatch(getDropdownProduct()).then(() => {
        dispatch(setListproStateToSuccess(response.data.data));
      });
    } else if (response.data.result === 'error') {
      dispatch(setListproStateToFailed());
      swal('Error!', response.data.message, 'error');
    }
  };
};
export const Create = (values, history) => {
  return async (dispatch) => {
    dispatch(setListproStateToFetching());
    const response = await httpClient.post(
      process.env.REACT_APP_API_URL + 'listpro',
      values
    );
    if (response.data.result == 'success') {
      dispatch(setListproStateToSuccess(response.data));
      swal('Success!', response.data.message, 'success').then((value) => {
        dispatch(setListproStateToClear());
        history.goBack();
        dispatch(Index());
      });
    } else if (response.data.result === 'error') {
      dispatch(setListproStateToFailed());
      swal('Error!', response.data.message, 'error');
    }
  };
};
export const Update = (values, history) => {
  return async (dispatch) => {
    dispatch(setListproStateToFetching());
    const response = await httpClient.put(
      process.env.REACT_APP_API_URL + 'listpro',
      values
    );
    if (response.data.result == 'success') {
      dispatch(setListproStateToClear());
      history.goBack();
      dispatch(Index());
    } else if (response.data.result === 'error') {
      dispatch(setListproStateToFailed());
      swal('Error!', response.data.message, 'error');
    }
  };
};
export const Remove = (id) => {
  return async (dispatch) => {
    console.log('remove');
    dispatch(setListproStateToFetching());
    const response = await httpClient.delete(
      process.env.REACT_APP_API_URL + 'listpro/' + id
    );
    if (response.data.result == 'success') {
      dispatch(setListproStateToSuccess());
      dispatch(Index());
    } else if (response.data.result === 'error') {
      dispatch(setListproStateToFailed());
      swal('Error!', response.data.message, 'error');
    }
  };
};
export const clearState = () => {
  return (dispatch) => {
    dispatch(setListproStateToClear());
  };
};
