import { postApi } from "../apis";

/**
 * post api for login
 * @returns data
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
