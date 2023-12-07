export const PAGE_PROPERTY = "PAGE_PROPERTY";
export const ERROR_PROPERTY = "ERROR_PROPERTY";
export const SINGLE_PROPERTY = "SINGLE_PROPERTY";

export const fetchAllProperty = (token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3002/estates", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: PAGE_PROPERTY, payload: data });
      } else {
        const errorMessage = await resp.json();
        dispatch({ type: ERROR_PROPERTY, payload: errorMessage.message });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const singleProperty = (token, id) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3002/estates/" + id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: SINGLE_PROPERTY, payload: data });
      } else {
        const errorMessage = await resp.json();
        dispatch({ type: ERROR_PROPERTY, payload: errorMessage.message });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
