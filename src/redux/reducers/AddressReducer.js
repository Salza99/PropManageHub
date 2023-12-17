import { FETCH_PROVINCE_DONE, GET_HAMLET_BY_RANGE, PROVINCES_GET } from "../actions/AddressAction";

const initialState = {
  provinces: [],
  hamletByRange: [],
  provinceOk: false,
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
    default:
      return state;
  }
};
export default AddressReducer;
