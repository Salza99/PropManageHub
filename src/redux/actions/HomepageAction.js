export const MY_PROFILE_INFO = "MY_PROFILE_INFO";
export const ERROR_PROFILE = "ERROR_PROFILE";
export const DETAIL_RESET = "DETAIL_RESET";

export const fetchMyProfile = (token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3002/users/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: MY_PROFILE_INFO, payload: data });
      } else {
        const errorMessage = await resp.json();
        dispatch({ type: ERROR_PROFILE, payload: errorMessage.message });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
