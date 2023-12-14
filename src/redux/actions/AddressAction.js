export const REGIONS_GET = "REGIONS_GET";

export const fetchOnRegions = (token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3002/addresses/geoRegions", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: REGIONS_GET, payload: data });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
