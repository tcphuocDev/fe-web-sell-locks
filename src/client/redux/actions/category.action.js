import { notification } from "antd";
import {
  create,
  detail,
  list,
  listChildren,
  remove,
  update,
} from "../../service/category.service";
import * as types from "../constants";

export const listCategory = (query) => {
  return async (dispatch) => {
    try {
      const response = await list(query);
      dispatch({
        type: types.LIST_CATEGORY,
        data: response.data,
      });
    } catch (error) {
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const listChildrenCategoryById = (query) => {
  return async (dispatch) => {
    try {
      const response = await list(query);
      dispatch({
        type: types.LIST_CHILDREN_CATEGORY_BY_ID,
        data: response.data,
      });
    } catch (error) {
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const listChildrenCategory = (query) => {
  return async (dispatch) => {
    try {
      const response = await listChildren(query);
      dispatch({
        type: types.LIST_CHILDREN_CATEGORY,
        data: response.data,
      });
    } catch (error) {
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const createCategory = (data, cb) => {
  return async (dispatch) => {
    try {
      const response = await create(data);

      if (response.statusCode !== 201) {
        notification.open({
          message: "Thất bại",
          description: response.message,
        });
      } else {
        notification.open({
          message: "Thành công",
          description: response.message,
        });
        cb();
      }
    } catch (error) {
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const updateCategory = (id, data, cb) => {
  return async (dispatch) => {
    try {
      const response = await update(id, data);

      if (response.statusCode !== 200) {
        notification.open({
          message: "Thất bại",
          description: response.message,
        });
      } else {
        notification.open({
          message: "Thành công",
          description: response.message,
        });
        cb();
      }
    } catch (error) {
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const deleteCategory = (id, cb) => {
  return async (dispatch) => {
    try {
      const response = await remove(id);

      if (response.statusCode !== 200) {
        notification.open({
          message: "Thất bại",
          description: response.message,
        });
      } else {
        notification.open({
          message: "Thành công",
          description: response.message,
        });
        cb();
      }
    } catch (error) {
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const detailCategory = (id) => {
  return async (dispatch) => {
    try {
      const response = await detail(id);
      dispatch({
        type: types.DETAIL_CATEGORY,
        data: response.data,
      });
    } catch (error) {
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const detailChildrenCategory = (id) => {
  return async (dispatch) => {
    try {
      const response = await detail(id);
      dispatch({
        type: types.DETAIL_CHILDREN_CATEGORY,
        data: response.data,
      });
    } catch (error) {
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};
