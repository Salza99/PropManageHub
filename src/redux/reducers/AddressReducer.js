import {
  ERROR_ADDRESS,
  ERROR_RESET,
  FETCH_PROVINCE_DONE,
  GET_HAMLET_BY_RANGE,
  POST_ADDRESS_OK,
  PROVINCES_GET,
  RESET_PROVINCE,
} from "../actions/AddressAction";

const initialState = {
  provinces: [],
  hamletByRange: [],
  provinceOk: false,
  fetchOk: false,
  errorMessages: "",
};

const AddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROVINCES_GET:
      return {
        ...state,
        provinces: action.payload,
      };
    case GET_HAMLET_BY_RANGE:
      return {
        ...state,
        hamletByRange: action.payload,
      };
    case FETCH_PROVINCE_DONE:
      return {
        ...state,
        provinceOk: action.payload,
      };
    case POST_ADDRESS_OK:
      return {
        ...state,
        fetchOk: action.payload,
      };
    case RESET_PROVINCE:
      return {
        ...state,
        provinces: action.payload,
      };
    case ERROR_ADDRESS:
      return {
        ...state,
        errorMessages: action.payload,
      };
    case ERROR_RESET:
      return {
        ...state,
        errorMessages: action.payload,
      };
    default:
      return state;
  }
};
export default AddressReducer;
