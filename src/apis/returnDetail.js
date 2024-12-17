import { API_ROOT } from "../utils/contants";
import axios from "axios";

// Fetch all return details
export const fetchAllReturnDetailsAPI = async () => {
  const response = await axios.get(`${API_ROOT}/v1/return/return-details`);
  return response.data;
};

export const createReturnAPI = async (formData) => {
  const response = await axios.post(
    `${API_ROOT}/v1/return/return-details`,
    formData
  );
  return response.data;
};
