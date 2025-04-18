import { getApi, postApi, deleteApi } from "../apis";

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
  return postApi("ecommerce/products", data);
};

/**
 * delete api for deleting a product
 */

export const deleteProduct = (productId: string) => {
  return deleteApi(`ecommerce/products/${productId}`);
};

/**
 * function to add a product to the cart
 */

export const addToCart = (productId: string) => {
  return postApi(`ecommerce/cart/item/${productId}`, {});
};
