import { ERROR_PROFILE, MY_PROFILE_INFO } from "../actions/HomepageAction";

const initialState = {
  myProfile: {
    id: "",
    username: "",
    password: "",
    name: "",
    surname: "",
    email: "",
    phone: 0,
    birthDay: "",
    insertDate: "",
    role: "",
    enabled: false,
    authorities: [
      {
        authority: "SUPER_ADMIN",
      },
    ],
    accountNonExpired: false,
    credentialsNonExpired: false,
    accountNonLocked: false,
  },
  errorMessage: "",
};

const HomepageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_PROFILE_INFO:
      return {
        ...state,
        myProfile: action.payload,
      };
    case ERROR_PROFILE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
export default HomepageReducer;
