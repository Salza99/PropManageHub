import { AUTHORIZATION_TOKEN } from "../actions/LoginAction";

const initialState = {
  respLogin: {
    authorizationToken: "",
  },
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZATION_TOKEN:
      return {
        ...state,
        respLogin: action.payload,
      };
    default:
      return state;
  }
};
export default LoginReducer;
