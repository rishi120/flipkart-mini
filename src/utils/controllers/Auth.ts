import { postApi } from "../apis";
// import { getStorageValue } from "../../pages/LoginAndRegistration/Cookies";

/**
 * post api for login
 * @returns
 */
export const Login = (data: Record<string, string>) => {
  return postApi("users/login", data);
};

/**
 *
 * logout api
 * @returns
 */

export const Logout = () => {
  return postApi("users/logout", null);
};

/**
 * for registration
 */

export const Registration = (data: Record<string, string>) => {
  return postApi("users/register", data, {
    headers: { Authorization: "Bearer undefined" },
  });
};
