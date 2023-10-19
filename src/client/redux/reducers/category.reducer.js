import * as types from "../constants";

const initialState = {
  items: [],
  childrenItems: [],
  childrens: [],
  meta: {},
  item: {},
  childrenItem: {},
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_CATEGORY:
      return {
        ...state,
        items: action.data.items,
        meta: action.data.meta,
      };
    case types.LIST_CHILDREN_CATEGORY_BY_ID:
      return {
        ...state,
        childrenItems: action.data.items,
      };
    case types.LIST_CHILDREN_CATEGORY:
      return {
        ...state,
        childrens: action.data.items,
      };
    case types.CREATE_CATEGORY:
    case types.DELETE_CATEGORY:
    case types.UPDATE_CATEGORY:
      return state;
    case types.DETAIL_CATEGORY:
      return {
        ...state,
        item: action.data,
      };
    case types.DETAIL_CHILDREN_CATEGORY:
      return {
        ...state,
        childrenItem: action.data,
      };
    default:
      return state;
  }
};

export default categoryReducer;
