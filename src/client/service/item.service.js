import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";
import { stringify } from "query-string";

export const list = (query) => axios.get(`${APIEnum.ITEM}?${stringify(query)}`);
export const create = (data) =>
  axios.post(APIEnum.ITEM, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const update = (id, data) =>
  axios.put(`${APIEnum.ITEM}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const remove = (id) => axios.delete(`${APIEnum.ITEM}/${id}`);
export const detail = (id) => axios.get(`${APIEnum.ITEM}/${id}?isView=1`);
export const review = (data) => axios.post("/review", data);
