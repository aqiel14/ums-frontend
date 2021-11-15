import {
    MACHINE_FETCHING,
    MACHINE_SUCCESS,
    MACHINE_FAILED,
    MACHINE_CLEAR,
  } from '../constants';
  
  const initialState = {
    isFetching: false,
    isError: false,
    result: null,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case MACHINE_FETCHING:
        return { ...state, isFetching: true, isError: false, result: null };
      case MACHINE_FAILED:
        return { ...state, isFetching: false, isError: true, result: null };
      case MACHINE_SUCCESS:
        return { ...state, isFetching: false, isError: false, result: payload };
      case MACHINE_CLEAR:
        return { ...state, result: null, isFetching: false, isError: false };
      default:
        return state;
    }
  };
  