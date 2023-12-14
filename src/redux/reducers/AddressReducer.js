import { REGIONS_GET } from "../actions/AddressAction";

const initialState = {
  regions: {
    totalResultsCount: 0,
    geonames: [
      {
        adminCode1: "",
        lng: "",
        geonameId: 0,
        toponymName: "",
        countryId: "",
        fcl: "",
        population: 0,
        countryCode: "",
        name: "",
        fclName: "",
        adminCodes1: {
          ISO3166_2: "",
        },
        countryName: "",
        fcodeName: "",
        adminName1: "",
        lat: "",
        fcode: "",
      },
    ],
  },
};

const AddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGIONS_GET:
      return {
        ...state,
        regions: action.payload,
      };
    default:
      return state;
  }
};
export default AddressReducer;
