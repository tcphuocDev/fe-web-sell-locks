import axios from "axios";

const baseUrl = "http://68.183.232.98:5000/api";
export const getAllItems = () => {
  return axios.get(`${baseUrl}/item`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
