import { COSTSTAT_FETCHING, COSTSTAT_SUCCESS, COSTSTAT_FAILED, server } from '../constants';
import { COSTSTAT2_FETCHING, COSTSTAT2_SUCCESS, COSTSTAT2_FAILED } from '../constants';
import { httpClient } from '../utils/HttpClient';

export const setCOSTSTATStateToFetching = () => ({
  type: COSTSTAT_FETCHING,
});

export const setCOSTSTATStateToFailed = () => ({
  type: COSTSTAT_FAILED,
});
export const setCOSTSTATStateToSuccess = (payload) => ({
  type: COSTSTAT_SUCCESS,
  payload,
});

export const getCurrentListproCoststat = () => {
  return async (dispatch) => {
    dispatch(setCOSTSTATStateToFetching());
    const response = await httpClient.get(
      server.COSTSTAT_ENDPOINT + '/current_listpro'
    );
    
    if (response.data.result == 'success') {
      dispatch(setCOSTSTATStateToSuccess(response.data.data));
    } else if (response.data.result === 'error') {
      dispatch(setCOSTSTATStateToFailed());
      return response.data.message;
    }
  };
};