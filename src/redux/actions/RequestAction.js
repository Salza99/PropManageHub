export const PAGE_REQUEST = "PAGE_REQUEST";
export const ERROR_REQUEST = "ERROR_REQUEST";

export const fetchAllRequest = (token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3002/requests", {
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
