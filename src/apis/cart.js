import { API_ROOT } from "../utils/contants";

import axios from "axios";

export const deleteCartByIdAPI = async (formData) => {
  const response = await axios.delete(`${API_ROOT}/v1/cart/cart/`, {
    data: formData,
  });
  return response.data;
};

export const GetTotalCartByUserIdAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/v1/cart/GetTotalCart/${id}`);
  return response.data;
};
