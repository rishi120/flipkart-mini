import { getApi, postApi } from "../apis";

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

/**
 * post api for creating products
 * @returns data
 */

export const createProducts = (data: Record<string, any>) => {
  return postApi("ecommerce/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
