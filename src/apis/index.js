import { API_ROOT } from "../utils/contants";

import axios from "axios";

export const fecthPorductAPI = async () => {
  const response = await axios.get(`${API_ROOT}/v1/product`);
  return response.data;
};

// fetch product by id
export const fetchProductByIdAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/v1/product/${id}`);
  return response.data;
};

export const fetchCategoryAPI = async () => {
  const response = await axios.get(`${API_ROOT}/v1/category`);
  return response.data;
};

// fetch api product new  top 10
export const fetchTop10ProductNewAPI = async () => {
  const response = await axios.get(`${API_ROOT}/v1/product/getTop10`);
  return response.data;
};

export const fetchProductByCategory = async () => {
  const response = await axios.get(`${API_ROOT}/v1/product/getSortByCategory`);
  return response.data;
};

export const fetchProvincesAPI = async () => {
  const response = await axios.get("https://vapi.vnappmob.com/api/province/");
  return response.data.results;
};

export const fetchDistrictsByProvinceId = async (provinceId) => {
  const response = await axios.get(
    `https://vapi.vnappmob.com/api/province/district/${provinceId}`
  );
  return response.data.results;
};

export const fetchWardsByDistrictId = async (districtId) => {
  const response = await axios.get(
    `https://vapi.vnappmob.com/api/province/ward/${districtId}`
  );
  return response.data.results;
};

export const LoginAPI = async (formData) => {
  const response = await axios.post(`${API_ROOT}/v1/user/login`, formData);
  return response.data;
};

export const RegisterAPI = async (formData) => {
  const response = await axios.post(`${API_ROOT}/v1/user/users`, formData);
  return response.data;
};

export const addToCartAPI = async (formData) => {
  const response = await axios.post(`${API_ROOT}/v1/cart/cart`, formData);
  return response;
};

export const fetchCartByUserIdAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/v1/cart/cart/${id}`);
  return response.data;
};

export const deleteCartByIdAPI = async (id) => {
  const response = await axios.delete(`${API_ROOT}/v1/cart/cart/${id}`);
  return response;
};

export const updateProductQuantityAPI = async (cartId, quantity) => {
  const response = await axios.put(`${API_ROOT}/v1/cart/update`, {
    cartId,
    quantity,
  });
  return response.data;
};

export const addInvoiceAPI = async (formData) => {
  const response = await axios.post(`${API_ROOT}/v1/invoices/create`, formData);
  return response;
};

export const updateInvoices = async (formData) => {
  const response = await axios.put(`${API_ROOT}/v1/invoices/update`, formData);
  return response;
};

export const PaymentMoMoAPI = async (formData) => {
  const response = await axios.post(`${API_ROOT}/v1/api/payment`, formData);
  return response.data;
};

export const PaymentStatusMoMoAPI = async (orderId) => {
  const response = await axios.get(`${API_ROOT}/v1/api/payment/status`, {
    params: { orderId },
  });
  return response;
};

export const fetchGetVoucherAPI = async (id) => {
  const response = await axios.get(
    `${API_ROOT}/v1/voucher/getVoucherByUser/${id}`
  );
  return response.data;
};

export const fetchGetVoucherSaveAPI = async (id) => {
  const response = await axios.get(
    `${API_ROOT}/v1/voucher/GetVouchersSaveByUserID/${id}`
  );
  return response.data;
};

export const addVoucherByUserID = async (formData) => {
  const response = await axios.post(
    `${API_ROOT}/v1/voucher/addVoucherToUser`,
    formData
  );
  return response;
};

export const fetchVoucherByIdAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/v1/voucher/${id}`);
  return response.data;
};

export const fecthFindByIdUserAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/v1/user/${id}`);
  return response.data;
};

export const fecthInvoiceByIdUserAPI = async (id, orderStatus) => {
  const response = await axios.get(
    `${API_ROOT}/v1/invoices/invoices/${id}/${orderStatus}`
  );
  return response.data;
};

export const fetchInvoiceDetailByIdInvoiceAPI = async (id) => {
  const response = await axios.get(`${API_ROOT}/v1/invoices/detail/${id}`);
  return response.data;
};

export const createfeedbacksByInvoicesDetailAPI = async (formData) => {
  const response = await axios.post(
    `${API_ROOT}/v1/feedback/create`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const fetchFeedbackByProductIdAPI = async (id) => {
  const response = await axios.get(
    `${API_ROOT}/v1/feedback//feedback/product/${id}`
  );
  return response.data;
};
export const fetchGetProductBySupCategoryAPI = async (id) => {
  const response = await axios.get(
    `${API_ROOT}/v1/product/getProductBySup/${id}`
  );
  return response.data;
};

export const fetchCheckEmailAPI = async (email) => {
  const response = await axios.get(`${API_ROOT}/v1/user/email/${email}`);
  return response.data;
};
export const sendEmailAPI = async (formData) => {
  const response = await axios.post(`${API_ROOT}/v1/email/send`, formData);
  return response;
};

export const updatePasswordAPI = async (formData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/user/update-password`,
    formData
  );
  return response;
};
