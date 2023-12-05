import { AUTHORIZATION_TOKEN, ERROR_LOGIN, RESET_ERROR_MESSAGE } from "../actions/LoginAction";

const initialState = {
  respLogin: {
    authorizationToken: "",
    errorMessage: "",
  },
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZATION_TOKEN:
      return {
        ...state,
        respLogin: {
          ...state.respLogin,
          authorizationToken: action.payload.token,
        },
      };
    case ERROR_LOGIN:
      return {
        ...state,
        respLogin: {
          ...state.respLogin,
          errorMessage: action.payload,
        },
      };
    case RESET_ERROR_MESSAGE:
      return {
        ...state,
        respLogin: {
          ...state.respLogin,
          errorMessage: action.payload,
        },
      };
    default:
      return state;
  }
};
export default LoginReducer;
