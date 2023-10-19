import { notification } from "antd";
import { toast } from "react-toastify";
import {
  check,
  create,
  detail,
  list,
  remove,
  update,
} from "../../service/coupon.service";
import * as types from "../constants";

export const listCoupon = (query) => {
  return async (dispatch) => {
    try {
      const response = await list(query);
      dispatch({
        type: types.LIST_COUPON,
        data: response.data,
      });
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const createCoupon = (data, cb) => {
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
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const updateCoupon = (id, data, cb) => {
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
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const deleteCoupon = (id, cb) => {
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
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const detailCoupon = (id) => {
  return async (dispatch) => {
    try {
      const response = await detail(id);
      dispatch({
        type: types.DETAIL_COUPON,
        data: response.data,
      });
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};
export const checkCoupon = (code) => {
  return async (dispatch) => {
    try {
      const response = await check(code);
      if (response?.statusCode === 404) {
        toast.error(`Mã ${response?.message}`);
      } else {
        toast.success("Áp dụng mã thành công");
        dispatch({
          type: types.CHECK_COUPON,
          data: response?.data,
        });
      }
    } catch (error) {
      toast.error(`${error?.message}`);
    }
  };
};
