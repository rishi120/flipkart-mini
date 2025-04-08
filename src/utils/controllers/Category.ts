import { postApi } from "../apis";

/**
 * post api for creating categories
 * @returns category name
 */

export const CreateCategory = (categoryName: string) => {
  return postApi("ecommerce/categories", categoryName);
};
