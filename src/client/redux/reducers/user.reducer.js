import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_USER:
      return {
        ...state,
        items: action.data.items,
        meta: action.data.meta,
      };
    case types.UPDATE_USER:
      action.cb();
      return state;
    default:
      return state;
  }
};

export default userReducer;
