import { API_ROOT } from "../utils/contants";
import axios from "axios";

const token = "c40cb3f6-a81c-11ef-8e53-0a00184fe694";

// Xoá giỏ hàng theo ID
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

export const getProvincesAPI = async () => {
  try {
    const response = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`,
      {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching provinces", error);
    throw error;
  }
};

export const getDistrictsByProvinceAPI = async (provinceId) => {
  try {
    const response = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`,
      {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        params: { province_id: provinceId },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching districts for province ${provinceId}`, error);
    throw error;
  }
};

export const getWardsByDistrictAPI = async (districtId) => {
  try {
    const response = await axios.post(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id`,
      {
        district_id: districtId,
      },
      {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching wards for district ${districtId}`, error);
    throw error;
  }
};

export const calculateShipment = async (formData) => {
  try {
    const response = await axios.post(
      `${API_ROOT}/v1/ngh/calculate-fee`,
      formData,
      {
        headers: {
          token: token,
          shopid: 5470916,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error calculating shipment fee:", error);
    throw error;
  }
};
