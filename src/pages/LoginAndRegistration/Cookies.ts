import Cookies from "universal-cookie";
const cookies = new Cookies();

/**
 * Stores authentication tokens (access token, refresh token, and ID token) in cookies.
 * @param {string} accessToken - The access token.
 * @param {string} refreshToken - The refresh token.
 * @param {string} id_token - The ID token.
 * @param {number} expiresIn - The token expiration time in seconds.
 */
export const setStorageValue = (accessToken: string, refreshToken: string) => {
  // // Store access token with expiration
  cookies.set("access_token", accessToken, {
    path: "/",
    secure: import.meta.env.DEV, // Ensures it's sent only over HTTPS
    sameSite: "strict",
    httpOnly: false, // Set to true if handling tokens server-side
  });

  // Store refresh token (typically does not have an expiry set in cookies)
  cookies.set("refresh_token", refreshToken, {
    path: "/",
    secure: import.meta.env.DEV,
    sameSite: "strict",
    httpOnly: false, // Set to true if handling tokens server-side
  });
};

/**
 * Retrieves a stored cookie value by key.
 * @param {string} key - The name of the cookie to retrieve.
 * @returns {string | undefined} - The stored cookie value, or undefined if not found.
 */
export const getStorageValue = (key: string) => {
  return cookies.get(key);
};

/**
 * Clears session storage and removes authentication-related cookies.
 * Used during logout to clear stored tokens.
 */
export const clearData = () => {
  cookies.remove("access_token", { path: "/" });
  cookies.remove("refresh_token", { path: "/" });
  localStorage.removeItem("userDetails");
};
