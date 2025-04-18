import { getApi, deleteApi } from "../apis";

/**
 * function to call the user cart api
 */

export const fetchUserCart = () => {
  return getApi("ecommerce/cart");
};

/**
 * function to remove item from cart
 */

export const removeItemFromCart = (productId: string) => {
  return deleteApi(`ecommerce/cart/item/${productId}`);
};
