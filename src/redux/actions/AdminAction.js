export const PAGE_ADMIN = "PAGE_ADMIN";
export const ERROR_ADMIN = "ERROR_ADMIN";

export const fetchAllAdmin = (token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3002/users", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: PAGE_ADMIN, payload: data });
      } else {
        const errorMessage = await resp.json();
        dispatch({ type: ERROR_ADMIN, payload: errorMessage.message });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
