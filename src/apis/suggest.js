import { API_ROOT } from "../utils/contants";

import axios from "axios";

// Cập nhật API để chấp nhận tham số minSupport
export const recommendProductsByPurchaseHistoryAPI = async (
  productId,
  minSupport
) => {
  try {
    const response = await axios.get(
      `${API_ROOT}/v1/product/suggestApriori/${productId}`,
      {
        params: {
          minSupport: minSupport,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recommended products", error);
    throw error;
  }
};
