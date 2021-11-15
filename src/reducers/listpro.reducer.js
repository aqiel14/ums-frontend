import {
    LISTPRO_FETCHING,
    LISTPRO_SUCCESS,
    LISTPRO_FAILED,
    LISTPRO_CLEAR,
    FETCHOPTION_SUCCESS,
  } from '../constants';
  
  const initialState = {
    isFetching: false,
    isError: false,
    result: null,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case LISTPRO_FETCHING:
        return { ...state, isFetching: true, isError: false, result: null };
      case LISTPRO_FAILED:
        return { ...state, isFetching: false, isError: true, result: null };
      case LISTPRO_SUCCESS:
        return { ...state, isFetching: false, isError: false, result: payload };
      case LISTPRO_CLEAR:
        return { ...state, result: null, isFetching: false, isError: false };
      case FETCHOPTION_SUCCESS:
        return { ...state, isFetching: false, isError: false, options: payload };
      default:
        return state;
    }
  };
  