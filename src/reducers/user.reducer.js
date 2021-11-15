import {
  USER_FETCHING,
  USER_SUCCESS,
  USER_FAILED,
  USER_CLEAR,
} from '../constants';

const initialState = {
  isFetching: false,
  isError: false,
  result: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };
    case USER_FAILED:
      return { ...state, isFetching: false, isError: true, result: null };
    case USER_SUCCESS:
      return { ...state, isFetching: false, isError: false, result: payload };

    case USER_CLEAR:
      return { ...state, result: null, isFetching: false, isError: false };
    default:
      return state;
  }
};
