import {
    MATERIAL_FETCHING,
    MATERIAL_SUCCESS,
    MATERIAL_FAILED,
    MATERIAL_CLEAR,
    FETCHOPTION_SUCCESS,
  } from '../constants';
  
  const initialState = {
    isFetching: false,
    isError: false,
    result: null,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case MATERIAL_FETCHING:
        return { ...state, isFetching: true, isError: false, result: null };
      case MATERIAL_FAILED:
        return { ...state, isFetching: false, isError: true, result: null };
      case MATERIAL_SUCCESS:
        return { ...state, isFetching: false, isError: false, result: payload };
      case MATERIAL_CLEAR:
        return { ...state, result: null, isFetching: false, isError: false };
        case FETCHOPTION_SUCCESS:
          return { ...state, isFetching: false, isError: false, options: payload };
        default:
        return state;
    }
  };