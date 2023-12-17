export const PROVINCES_GET = "PROVINCES_GET";
export const FETCH_PROVINCE_DONE = "FETCH_PROVINCE_DONE";
export const GET_HAMLET_BY_RANGE = "GET_HAMLET_BY_RANGE";

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
