import { ERROR_CUSTOMER, PAGE_CUSTOMER, SINGLE_CUSTOMER } from "../actions/CustomerAction";

const initialState = {
  content: [
    {
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
  ],
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
  errorMessages: "",
};

const CustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_CUSTOMER:
      return {
        ...state,
        content: action.payload.content,
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
    default:
      return state;
  }
};
export default CustomerReducer;
