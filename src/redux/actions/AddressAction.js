export const PROVINCES_GET = "PROVINCES_GET";
export const FETCH_PROVINCE_DONE = "FETCH_PROVINCE_DONE";
export const GET_HAMLET_BY_RANGE = "GET_HAMLET_BY_RANGE";
export const POST_ADDRESS_OK = "POST_ADDRESS_OK";
export const POST_ADDRESS_RESET = "POST_ADDRESS_RESET";
export const ERROR_ADDRESS = "ERROR_ADDRESS";
export const ERROR_RESET = "ERROR_RESET";
export const RESET_PROVINCE = "RESET_PROVINCE";
export const ADDRESS_INSERT = "ADDRESS_INSERT";
export const ADDRESS_RESET = "ADDRESS_RESET";
export const fetchOnsearch = (token, search) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3002/addresses/geoSearch?search=" + search, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: PROVINCES_GET, payload: data.postalCodes });
        dispatch({ type: FETCH_PROVINCE_DONE, payload: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const fetchOnhamletByRange = (token, lat, lng) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3002/addresses/geoHamletByRange?lng=" + lng + "&lat=" + lat, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: GET_HAMLET_BY_RANGE, payload: data.geonames });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const postAddress = (token, body) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3002/addresses", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: ADDRESS_INSERT, payload: data });
        dispatch({ type: POST_ADDRESS_OK, payload: true });
      } else {
        const errorMessage = await resp.json();
        dispatch({ type: ERROR_ADDRESS, payload: errorMessage.errorsList });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
