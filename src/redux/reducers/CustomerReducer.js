import {
  ERROR_CUSTOMER,
  PAGE_CUSTOMER,
  POST_CUSTOMER_DATA,
  POST_CUSTOMER_OK,
  RESET_CUSTOMER_ERRORS,
  RESET_CUSTOMER_OK,
  SINGLE_CUSTOMER,
} from "../actions/CustomerAction";
import { DETAIL_RESET } from "../actions/HomepageAction";

const initialState = {
  content: [
    {
      id: "",
      name: "",
      surname: "",
      email: "",
      phone: 0,
      birthDay: "",
      insertDate: "",
      sellingProperties: [],
      request: null,
      followedByUser: {},
    },
  ],
  pageable: { pageNumber: 0, pageSize: 0 },
  totalPages: 0,
  selected: {
    id: "",
    name: "",
    surname: "",
    email: "",
    phone: 0,
    birthDay: "",
    insertDate: "",
    sellingProperties: [],
    request: null,
    followedByUser: {},
  },
  createCustomerOk: false,
  errorMessages: "",
};

const CustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_CUSTOMER:
      return {
        ...state,
        content: action.payload.content,
        pageable: action.payload.pageable,
        totalPages: action.payload.totalPages,
      };
    case SINGLE_CUSTOMER:
      return {
        ...state,
        selected: action.payload,
      };
    case ERROR_CUSTOMER:
      return {
        ...state,
        errorMessages: action.payload,
      };
    case POST_CUSTOMER_OK:
      return {
        ...state,
        createCustomerOk: action.payload,
      };
    case POST_CUSTOMER_DATA:
      return {
        ...state,
        selected: action.payload,
      };
    case RESET_CUSTOMER_OK:
      return {
        ...state,
        createCustomerOk: action.payload,
      };
    case RESET_CUSTOMER_ERRORS:
      return {
        ...state,
        errorMessages: action.payload,
      };
    case DETAIL_RESET:
      return {
        ...state,
        selected: {
          id: "",
          name: "",
          surname: "",
          email: "",
          phone: 0,
          birthDay: "",
          sellingProperties: [],
          request: null,
          followedByUser: {},
        },
        errorMessages: action.payload,
      };
    default:
      return state;
  }
};
export default CustomerReducer;
