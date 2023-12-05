export const GET_USER_BY_LOGIN = "GET_USER_BY_LOGIN";
export const AUTHORIZATION_TOKEN = "AUTHORIZATION_TOKEN";
export const ERROR_LOGIN = "ERROR_LOGIN";
export const RESET_ERROR_MESSAGE = "RESET_ERROR_MESSAGE";

export const loginFetch = (loginInput) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3002/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInput),
        headers: { "Content-type": "application/json" },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: AUTHORIZATION_TOKEN, payload: data });
      } else {
        const errorMessage = await resp.json();
        dispatch({ type: ERROR_LOGIN, payload: errorMessage.message });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
