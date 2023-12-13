import {
  ERROR_ADMIN,
  PAGE_ADMIN,
  POST_ADMIN_OK,
  RESET_ADMIN_ERRORS,
  RESET_ADMIN_OK,
  SINGLE_ADMIN,
} from "../actions/AdminAction";
import { DETAIL_RESET } from "../actions/HomepageAction";

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
  selected: {
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
  errorMessages: "",
  createAdminOk: false,
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_ADMIN:
      return {
        ...state,
        content: action.payload.content,
      };
    case SINGLE_ADMIN:
      return {
        ...state,
        selected: action.payload,
      };
    case DETAIL_RESET:
      return {
        ...state,
        selected: {
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
        errorMessages: action.payload,
      };
    case POST_ADMIN_OK:
      return {
        ...state,
        createAdminOk: action.payload,
      };
    case RESET_ADMIN_OK:
      return {
        ...state,
        createAdminOk: action.payload,
      };
    case RESET_ADMIN_ERRORS:
      return {
        ...state,
        errorMessages: action.payload,
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
