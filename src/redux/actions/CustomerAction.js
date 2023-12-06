export const PAGE_CUSTOMER = "PAGE_CUSTOMER";
export const ERROR_CUSTOMER = "ERROR_CUSTOMER";

export const fetchAllCustomer = (token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3002/customers", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: PAGE_CUSTOMER, payload: data });
      } else {
        const errorMessage = await resp.json();
        dispatch({ type: ERROR_CUSTOMER, payload: errorMessage.message });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
