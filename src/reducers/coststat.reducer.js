import { COSTSTAT_FETCHING, COSTSTAT_SUCCESS, COSTSTAT_FAILED } from '../constants';
import { STAT2_FETCHING, STAT2_SUCCESS, STAT2_FAILED } from '../constants';

const initialState = {
  isFetching: false,
  isError: false,
  result: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case COSTSTAT_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };
    case COSTSTAT_FAILED:
      return { ...state, isFetching: false, isError: true, result: null };
    case COSTSTAT_SUCCESS:
      return { ...state, isFetching: false, isError: false, result: payload };

    default:
      return state;
  }
};
