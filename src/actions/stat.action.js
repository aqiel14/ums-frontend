import { STAT_FETCHING, STAT_SUCCESS, STAT_FAILED, server } from "../constants";
import { httpClient } from "./../utils/HttpClient";

export const setSTATStateToFetching = () => ({
  type: STAT_FETCHING,
});

export const setSTATStateToFailed = () => ({
  type: STAT_FAILED,
});
export const setSTATStateToSuccess = (payload) => ({
  type: STAT_SUCCESS,
  payload,
});

// export const Index = () => {
//   return async (dispatch) => {
//     dispatch(setOrderStateToFetching);
//     const response = await httpClient.get(
//       process.env.REACT_APP_API_URL + server.ORDER_URL
//     );
//     if (response.data.result == 'success') {
//       // console.log(response.data);
//       dispatch(setOrderStateToSuccess(response.data.data));
//     } else if (response.data.result === 'error') {
//       dispatch(setOrderStateToFailed());
//       swal('Error!', response.data.message, 'error');
//     }
//   };
// };

// export const getCurrentInventoryStat = () => {
//   return async (dispatch) => {
//     dispatch(setSTATStateToFetching());
//     const response = await httpClient.get(
//       server.STAT_ENDPOINT + '/current_inventory'
//     );
//     let result = response.data.data.flat().map((item) => {
//       return {
//         name: item.name,
//       };
//     });
//     if (response.data.result == 'success') {
//       dispatch(setSTATStateToSuccess(result));
//     } else if (response.data.result === 'error') {
//       dispatch(setSTATStateToFailed());
//       return response.data.message;
//     }
//   };
// };

export const getCurrentOrderStat = () => {
  return async (dispatch) => {
    dispatch(setSTATStateToFetching());
    const response = await httpClient.get(
      server.STAT_ENDPOINT + "/current_order"
    );

    if (response.data.result == "success") {
      dispatch(setSTATStateToSuccess(response.data.data));
    } else if (response.data.result === "error") {
      dispatch(setSTATStateToFailed());
      return response.data.message;
    }
  };
};

export const getCurrentListproStat = () => {
  return async (dispatch) => {
    dispatch(setSTATStateToFetching());
    const response = await httpClient.get(
      server.STAT_ENDPOINT + "/current_listpro"
    );
    let result = response.data.data.flat(3).map((listpro) => {
      return {
        date: listpro.created,
      };
    });
    if (response.data.result == "success") {
      dispatch(setSTATStateToSuccess(result));
    } else if (response.data.result === "error") {
      dispatch(setSTATStateToFailed());
      return response.data.message;
    }
  };
};
