import { postApi } from "../apis";

export const refreshToken = (refreshToken: string) => {
  return postApi("users/refresh-token", { refreshToken });
};
