import {
  USER_FETCHING,
  USER_SUCCESS,
  USER_FAILED,
  USER_CLEAR,
} from '../constants';
import swal from 'sweetalert';
import { httpClient } from './../utils/HttpClient';

export const setUserStateToFetching = () => ({
  type: USER_FETCHING,
});

export const setUserStateToFailed = () => ({
  type: USER_FAILED,
});
export const setUserStateToSuccess = (payload) => ({
  type: USER_SUCCESS,
  payload,
});
export const seUserStateToClear = () => ({
  type: USER_CLEAR,
});

export const getSingleUser = (UserId) => {
  return async (dispatch) => {
    dispatch(setUserStateToFetching());
    const response = await httpClient.get(
      process.env.REACT_APP_API_URL + 'profile/id/' + UserId
    );
    if (response.data.result == 'success') {
      dispatch(setUserStateToSuccess(response.data.data));
    } else if (response.data.result === 'error') {
      dispatch(setUserStateToFailed());
      swal('Error!', response.data.message, 'error');
    }
  };
};
