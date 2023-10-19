import * as types from "../constants";

const initialState = {
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: null,
  isOpenModal: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        token: action.token,
        refreshToken: action.refreshToken,
      };
    case types.REGISTER:
      return {
        ...state,
        token: action.token,
        refreshToken: action.refreshToken,
      };
    case types.GET_PROFILE:
      return {
        ...state,
        user: action.user,
      };
    case types.UPDATE:
      return {
        ...state,
      };
    case types.LOGOUT:
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return {
        token: null,
        refreshToken: null,
        user: null,
      };
    case types.OPEN:
      return {
        ...state,
        isOpenModal: true,
      };
    case types.CLOSE:
      return {
        ...state,
        isOpenModal: false,
      };
    default:
      return state;
  }
};

export default authReducer;
