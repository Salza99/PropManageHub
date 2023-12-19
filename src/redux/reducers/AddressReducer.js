import {
  ADDRESS_INSERT,
  ADDRESS_RESET,
  ERROR_ADDRESS,
  ERROR_RESET,
  FETCH_PROVINCE_DONE,
  GET_HAMLET_BY_RANGE,
  POST_ADDRESS_OK,
  POST_ADDRESS_RESET,
  PROVINCES_GET,
  RESET_PROVINCE,
} from "../actions/AddressAction";

const initialState = {
  provinces: [],
  hamletByRange: [],
  addressId: 0,
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
    case POST_ADDRESS_RESET:
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
    case ADDRESS_INSERT:
      return {
        ...state,
        addressId: action.payload.id,
      };
    case ADDRESS_RESET:
      return {
        ...state,
        addressId: action.payload,
      };
    default:
      return state;
  }
};
export default AddressReducer;
