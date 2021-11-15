import {
  ORDER_FETCHING,
  ORDER_SUCCESS,
  ORDER_FAILED,
  ORDER_CLEAR,
} from '../constants';

const initialState = {
  isFetching: false,
  isError: false,
  result: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };
    case ORDER_FAILED:
      return { ...state, isFetching: false, isError: true, result: null };
    case ORDER_SUCCESS:
      return { ...state, isFetching: false, isError: false, result: payload };
    case ORDER_CLEAR:
      return { ...state, result: null, isFetching: false, isError: false };
    default:
      return state;
  }
};
