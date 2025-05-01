import { deleteApi, getApi, postApi } from "../apis";

/**
 * fetch the logged in user profile details
 * @returns api endpoint
 */

export const fetchUserProfile = () => {
  return getApi("users/current-user");
};

/**
 * update current password
 */

export const updateCurrentPassword = (payload: Record<string, string>) => {
  return postApi("users/change-password", payload);
};

/** get logged in user address */

export const fetchUserAddress = () => {
  return getApi("ecommerce/addresses");
};

/**
 * add new address
 * @param payload address details
 * @returns api endpoint
 */
export const addNewAddress = (payload: Record<string, string>) => {
  return postApi("ecommerce/addresses", payload);
};

/**
 * delete address
 * @param addressId address id
 * @returns api endpoint
 */
export const deleteAddress = (addressId: string) => {
  return deleteApi(`ecommerce/addresses/${addressId}`);
};
