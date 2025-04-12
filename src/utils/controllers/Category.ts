import { getApi, postApi } from "../apis";

/**
 * post api for creating categories
 * @returns category name
 */

export const CreateCategory = (categoryName: string) => {
  return postApi("ecommerce/categories", categoryName);
};

/**
 * get api for retreving categories
 */

export const getAllCategories = (page: number, limit: number) => {
  return getApi(`ecommerce/categories?page=${page}&limit=${limit}`);
};
