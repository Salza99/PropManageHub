import { ERROR_ADMIN, PAGE_ADMIN } from "../actions/AdminAction";
import { ERROR_CUSTOMER, PAGE_CUSTOMER } from "../actions/CustomerAction";

const initialState = {
  content: [
    {
      id: "",
      username: "",
      name: "",
      surname: "",
      email: "",
      phone: 0,
      birthDay: "",
      insertDate: "",
      role: "",
      enable: false,
      authorities: [
        {
          authority: "",
        },
      ],
      accountNonLocked: true,
      accountNonExpired: true,
      credentialsNonExpired: true,
    },
  ],
  errorMessages: "",
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_ADMIN:
      return {
        ...state,
        content: action.payload.content,
      };
    case ERROR_ADMIN:
      return {
        ...state,
        errorMessages: action.payload,
      };
    default:
      return state;
  }
};
export default AdminReducer;
