import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_ITEM:
      return {
        ...state,
        items: action.data.items,
        meta: action.data.meta,
      };
    case types.CREATE_ITEM:
    case types.DELETE_ITEM:
    case types.UPDATE_ITEM:
      return state;
    case types.DETAIL_ITEM:
      return {
        ...state,
        item: action.data,
      };

    default:
      return state;
  }
};

export default itemReducer;
