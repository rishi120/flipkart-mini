import { getApi } from "../apis";

/**
 * fetch the logged in user profile details
 * @returns api endpoint
 */

export const fetchUserProfile = () => {
  return getApi("ecommerce/profile");
};
