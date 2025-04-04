import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getStorageValue } from "../pages/LoginAndRegistration/Cookies";

// Environment variable for the API server URL
const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL;

// You can uncomment and adjust the code below if you plan to include authentication tokens.
const accessLoginToken = getStorageValue("access_token");
axios.defaults.headers.common.Authorization = `Bearer ${accessLoginToken}`;

/**
 * Gets the API data from the server.
 * @param url - the url to get the data from.
 * @param config - optional axios request config (headers, params, etc.).
 * @returns AxiosResponse - the response from the server.
 */
export const getApi = (
  url: string,
  config?: AxiosRequestConfig,
  shortUrl: boolean = true
): Promise<AxiosResponse> =>
  axios.get((shortUrl ? API_SERVER_URL : "") + url, config);

/**
 * Posts data to the API server.
 * @param url - the url to post to.
 * @param data - the data to post.
 * @param config - optional axios request config (headers, params, etc.).
 * @param shortUrl - whether or not to use the short url.
 * @returns AxiosResponse - the response from the server.
 */
export const postApi = (
  url: string,
  data: any, // Replace `any` with the specific data type if known
  config?: AxiosRequestConfig,
  shortUrl: boolean = true
): Promise<AxiosResponse> =>
  axios.post((shortUrl ? API_SERVER_URL : "") + url, data, config);

/**
 * Sends a PUT request to the API server.
 * @param url - the url to update.
 * @param data - the data to update.
 * @param config - optional axios request config (headers, params, etc.).
 * @param shortUrl - whether or not to use the short url.
 * @returns AxiosResponse - the response from the server.
 */
export const putApi = (
  url: string,
  data: any, // Replace `any` with the specific data type if known
  config?: AxiosRequestConfig,
  shortUrl: boolean = true
): Promise<AxiosResponse> =>
  axios.put((shortUrl ? API_SERVER_URL : "") + url, data, config);

/**
 * Deletes the given url from the API server.
 * @param url - the url to delete from the API server.
 * @returns AxiosResponse - the response from the server.
 */
export const deleteApi = (
  url: string,
  shortUrl: boolean = true
): Promise<AxiosResponse> =>
  axios.delete((shortUrl ? API_SERVER_URL : "") + url);
