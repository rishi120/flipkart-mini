/** third party imports */
import { useContext, createContext, useState, useEffect, useRef } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { jwtDecode, InvalidTokenError, JwtPayload } from "jwt-decode";
/** local imports */
import { ChildrenPropsI } from "../../../interface";
import { Login, Registration, Logout } from "../../controllers/Auth";
import { refreshToken } from "../../controllers/RefreshToken";
import { handleErrorCodes, showSuccessMessage } from "../../utilities/Helper";
import {
  getStorageValue,
  setStorageValue,
  clearData,
} from "../../../pages/LoginAndRegistration/Cookies";

interface AuthContextI {
  storeAccessToken: string;
  setStoreAccessToken: () => React.Dispatch<React.SetStateAction<string>>;
}

const createContextAuthContext = createContext<AuthContextI | any>(null);
export const useAuthContext = () => useContext(createContextAuthContext);

const useAuth = () => {
  const [storeAccessToken, setStoreAccessToken] = useState(
    getStorageValue("access_token") || ""
  );
  const [userDetails, setUserDetails] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isRefreshing = useRef(false);

  /**
   * function to decode the access token and store the id, username and role in the respective state
   */
  const decodedToken = () => {
    try {
      const decodedToken = jwtDecode<
        JwtPayload & { _id: string; username: string; role: string }
      >(storeAccessToken);
      setUserDetails({
        id: decodedToken?._id,
        username: decodedToken?.username,
        role: decodedToken?.role,
      });
    } catch (error: any) {
      if (error instanceof InvalidTokenError) {
        console.error("Invalid token");
      } else {
        console.error("Error decoding token:", error.message);
      }
    }
  };

  /**
   * useEffect hook that triggers the decodedToken function when the accessToken changes.
   * @param {Function} decodedToken - Function to decode the token
   * @param {string} accessToken - The access token to check for changes
   * @returns None
   */
  useEffect(() => {
    if (storeAccessToken) {
      decodedToken();
    }
  }, [storeAccessToken]);

  /**
   * post api for user login
   */

  const { mutate: mutateLogin, isPending: isLoginLoading } = useMutation({
    mutationFn: Login,
    onSuccess: (data) => {
      const tokenDetails = data?.data?.data;
      localStorage.setItem("userDetails", JSON.stringify(tokenDetails?.user));
      axios.defaults.headers.common.Authorization = `Bearer ${tokenDetails?.accessToken}`;
      setStoreAccessToken(tokenDetails?.accessToken);
      setStorageValue(tokenDetails?.accessToken, tokenDetails?.refreshToken);
      showSuccessMessage(data?.data?.message, "login");
      navigate("/products");
    },
    onError: (error: Record<string, any>) => {
      console.log(error, "error");
      const errorMessage = error?.response?.data?.message;
      handleErrorCodes(errorMessage);
    },
  });

  /**
   * use mutation for user registration
   */

  const { mutate: mutateRegistration, isPending: isRegistrationLoading } =
    useMutation({
      mutationFn: Registration,
      onSuccess: (_data) => {
        showSuccessMessage("User registered successfully", "registration");
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.message;
        handleErrorCodes(errorMessage);
      },
    });

  const { mutate: mutateLogout, isPending: isUserLoggedOut } = useMutation({
    mutationFn: Logout,
    onSuccess: (data: Record<string, any>) => {
      showSuccessMessage(data?.data?.message, "logout");
      setStoreAccessToken("");
      clearData();
      navigate("/");
      queryClient.clear();
      axios.defaults.headers.common.Authorization = "";
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message;
      handleErrorCodes(errorMessage);
    },
  });

  /**
   * use mutation hook for calling the refresh token api
   */

  const { mutate: mutateRefreshToken } = useMutation({
    mutationFn: refreshToken,
    onSuccess: (data: Record<string, any>) => {
      const tokenDetails = data?.data?.data;
      axios.defaults.headers.common.Authorization = `Bearer ${tokenDetails?.accessToken}`;
      setStorageValue(
        tokenDetails?.accessToken,
        getStorageValue("refresh_token")
      );
      setStoreAccessToken(tokenDetails?.accessToken);
      retryQueuedRequests(tokenDetails?.accessToken);
      isRefreshing.current = false;
    },
    onError: (error: any) => {
      isRefreshing.current = false;
      const errorMessage = error?.response?.data?.message;
      handleErrorCodes(errorMessage);
    },
  });

  // request queue and refresh state
  const requestQueue = useRef<
    Array<{
      resolve: (value: any) => void;
      reject: (reason?: any) => void;
      config: AxiosRequestConfig;
    }>
  >([]).current;

  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      console.log(error.response?.data, "error response");
      const status = (error.response?.data as { statusCode?: number })
        ?.statusCode;
      const errorMessage = (error.response?.data as { message?: string })
        ?.message;
      const originalRequest = error.config as AxiosRequestConfig;

      if (status === 401 && errorMessage === "Invalid access token") {
        if (!isRefreshing.current) {
          isRefreshing.current = true;
          const refreshToken = getStorageValue("refresh_token");

          if (!refreshToken) {
            clearData();
            navigate("/");
            return Promise.reject(error);
          }

          mutateRefreshToken(refreshToken);
        }

        return new Promise((resolve, reject) => {
          requestQueue.push({
            resolve,
            reject,
            config: originalRequest,
          });
        });
      }

      return Promise.reject(error);
    }
  );

  const retryQueuedRequests = (token: string) => {
    while (requestQueue.length) {
      const { resolve, config } = requestQueue.shift()!;
      const retryConfig = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
      resolve(axios(retryConfig));
    }
  };

  const userLogout = () => {
    return mutateLogout();
  };

  const handleLogin = (data: Record<string, string>) => {
    return mutateLogin(data);
  };

  const handleRegistration = (data: Record<string, string>) => {
    return mutateRegistration(data);
  };

  return {
    // for handling the login with google redirection api
    handleLogin,
    isLoginLoading,

    // for handling the registration
    handleRegistration,
    isRegistrationLoading,

    // for access token
    storeAccessToken,

    // for user details
    userDetails,

    // for logout
    userLogout,
    isUserLoggedOut,
  };
};

export const ProvideAuthContext = ({ children }: ChildrenPropsI) => {
  const authContextData = useAuth();
  return (
    <createContextAuthContext.Provider value={authContextData}>
      {children}
    </createContextAuthContext.Provider>
  );
};
