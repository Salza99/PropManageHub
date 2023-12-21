export const PAGE_REQUEST = "PAGE_REQUEST";
export const ERROR_REQUEST = "ERROR_REQUEST";
export const SINGLE_REQUEST = "SINGLE_REQUEST";
export const POST_FETCH_OK = "POST_FETCH_OK";

export const fetchAllRequest = (token, page) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3002/requests?size=8&page=" + page, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: PAGE_REQUEST, payload: data });
      } else {
        const errorMessage = await resp.json();
        dispatch({ type: ERROR_REQUEST, payload: errorMessage.message });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const singleRequest = (token, id) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3002/requests/" + id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: SINGLE_REQUEST, payload: data });
      } else {
        const errorMessage = await resp.json();
        dispatch({ type: ERROR_REQUEST, payload: errorMessage.message });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const postRequest = (token, body) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3002/requests", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (resp.ok) {
        dispatch({ type: POST_FETCH_OK, payload: true });
      } else {
        const errorMessage = await resp.json();
        dispatch({ type: ERROR_REQUEST, payload: errorMessage.message });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
