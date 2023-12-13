export const PAGE_ADMIN = "PAGE_ADMIN";
export const ERROR_ADMIN = "ERROR_ADMIN";
export const SINGLE_ADMIN = "SINGLE_ADMIN";
export const POST_ADMIN_OK = "POST_ADMIN_OK";
export const RESET_ADMIN_OK = "RESET_ADMIN_OK";
export const RESET_ADMIN_ERRORS = "RESET_ADMIN_ERRORS";

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
export const singleAdmin = (token, id) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3002/users/" + id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: SINGLE_ADMIN, payload: data });
      } else {
        const errorMessage = await resp.json();
        dispatch({ type: ERROR_ADMIN, payload: errorMessage.message });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const postAdmin = (token, body) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3002/auth/registerAdmin", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (resp.ok) {
        dispatch({ type: POST_ADMIN_OK, payload: true });
      } else {
        const errorMessage = await resp.json();
        dispatch({ type: ERROR_ADMIN, payload: errorMessage.errorsList });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
