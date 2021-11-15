import {
  MATERIAL_FETCHING,
  MATERIAL_SUCCESS,
  MATERIAL_FAILED,
  MATERIAL_CLEAR,
  FETCHOPTION_SUCCESS,
} from "../constants";
import swal from "sweetalert";
import { httpClient } from "./../utils/HttpClient";

export const setMaterialStateToFetching = () => ({
  type: MATERIAL_FETCHING,
});

export const setMaterialStateToFailed = () => ({
  type: MATERIAL_FAILED,
});
export const setMaterialStateToClear = () => ({
  type: MATERIAL_CLEAR,
});
export const setMaterialStateToSuccess = (payload) => ({
  type: MATERIAL_SUCCESS,
  payload,
});
export const setFetchOptionStateToSuccess = (payload) => ({
  type: FETCHOPTION_SUCCESS,
  payload,
});

export const Index = () => {
  return async (dispatch) => {
    dispatch(setMaterialStateToFetching());
    const response = await httpClient.get(
      process.env.REACT_APP_API_URL + "material"
    );
    if (response.data.result == "success") {
      // console.log(response.data);
      dispatch(setMaterialStateToSuccess(response.data.data));
    } else if (response.data.result === "error") {
      dispatch(setMaterialStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};
export const getDropdownBahan = () => {
  return async (dispatch) => {
    dispatch(setMaterialStateToFetching());
    const response = await httpClient.get(
      process.env.REACT_APP_API_URL + "material_getbahan"
    );
    if (response.data.result == "success") {
      let result = response.data.data.flat().map((item) => {
        return {
          value: item._id,
          label: item.materialname,
        };
      });

      dispatch(setFetchOptionStateToSuccess(result));
    } else if (response.data.result === "error") {
      dispatch(setMaterialStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};
export const getSingleMaterial = (id) => {
  return async (dispatch) => {
    dispatch(setMaterialStateToFetching());
    const response = await httpClient.get(
      process.env.REACT_APP_API_URL + "material/" + id
    );

    if (response.data.result == "success") {
      dispatch(getDropdownBahan()).then(() => {
        dispatch(setMaterialStateToSuccess(response.data.data));
      });
    } else if (response.data.result === "error") {
      dispatch(setMaterialStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};
export const Create = (values, history) => {
  return async (dispatch) => {
    dispatch(setMaterialStateToFetching());
    const response = await httpClient.post(
      process.env.REACT_APP_API_URL + "material",
      values
    );
    if (response.data.result == "success") {
      dispatch(setMaterialStateToSuccess(response.data));
      swal("Success!", response.data.message, "success").then((value) => {
        dispatch(setMaterialStateToClear());
        history.goBack();
        dispatch(Index());
      });
    } else if (response.data.result === "error") {
      dispatch(setMaterialStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};
export const Update = (values, history) => {
  return async (dispatch) => {
    dispatch(setMaterialStateToFetching());
    const response = await httpClient.put(
      process.env.REACT_APP_API_URL + "material",
      values
    );
    if (response.data.result == "success") {
      dispatch(setMaterialStateToClear());
      history.goBack();
      dispatch(Index());
    } else if (response.data.result === "error") {
      dispatch(setMaterialStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};
export const Remove = (id) => {
  return async (dispatch) => {
    console.log("remove");
    dispatch(setMaterialStateToFetching());
    const response = await httpClient.delete(
      process.env.REACT_APP_API_URL + "material/" + id
    );
    if (response.data.result == "success") {
      dispatch(setMaterialStateToSuccess());
      dispatch(Index());
    } else if (response.data.result === "error") {
      dispatch(setMaterialStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};
export const clearState = () => {
  return (dispatch) => {
    dispatch(setMaterialStateToClear());
  };
};
