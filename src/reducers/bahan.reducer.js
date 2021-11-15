import {
    BAHAN_FETCHING,
    BAHAN_SUCCESS,
    BAHAN_FAILED,
    BAHAN_CLEAR,
    FETCHOPTION_SUCCESS,
  } from '../constants';
  
  const initialState = {
    isFetching: false,
    isError: false,
    result: null,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case BAHAN_FETCHING:
        return { ...state, isFetching: true, isError: false, result: null };
      case BAHAN_FAILED:
        return { ...state, isFetching: false, isError: true, result: null };
      case BAHAN_SUCCESS:
        return { ...state, isFetching: false, isError: false, result: payload };
      case BAHAN_CLEAR:
        return { ...state, result: null, isFetching: false, isError: false };
        case FETCHOPTION_SUCCESS:
      return { ...state, isFetching: false, isError: false, options: payload };
      default:
        return state;
    }
  };
  