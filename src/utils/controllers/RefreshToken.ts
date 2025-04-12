import { getApi } from "../apis";

export const getRefreshToken = () => {
  return getApi("users/refresh-token");
};
