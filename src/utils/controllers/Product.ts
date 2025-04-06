import { getApi } from "../apis";

/**
 * fetch product details
 * @returns api endpoint
 */

export const fetchAllProducts = (
  page: number,
  limit: number,
  productId: string | number
) => {
  return getApi(
    `ecommerce/products?page=${page}&limit=${limit}&productId=${productId}`
  );
};
