import { useContext, createContext, useState, useEffect } from "react";
import { ChildrenPropsI } from "../../../interface";
import { useMutation } from "@tanstack/react-query";
import { Login, Registration } from "../../controllers/Auth";
import { handleErrorCodes, showSuccessMessage } from "../../utilities/Helper";
import { useNavigate } from "react-router";
import { jwtDecode, InvalidTokenError, JwtPayload } from "jwt-decode";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import {
  getStorageValue,
  setStorageValue,
} from "../../../pages/LoginAndRegistration/Cookies";
import axios from "axios";

interface AuthContextI {
  welcome: string;
}

const createContextAuthContext = createContext<AuthContextI | any>(null);
export const useAuthContext = () => useContext(createContextAuthContext);

const useAuth = () => {
  const [storeAccessToken, setStoreAccessToken] = useState(
    getStorageValue("access_token") || ""
  );
  const [userDetails, setUserDetails] = useState<Record<string, string>>({});
  const navigate = useNavigate();

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
      const decodeAccessToken = jwtDecode(tokenDetails?.accessToken);
      localStorage.setItem("userDetails", JSON.stringify(tokenDetails?.user));
      axios.defaults.headers.common.Authorization = `Bearer ${tokenDetails?.accessToken}`;
      setStoreAccessToken(tokenDetails?.accessToken);
      setStorageValue(
        tokenDetails?.accessToken,
        tokenDetails?.refreshToken,
        decodeAccessToken?.exp || 0
      );
      showSuccessMessage(data?.data?.message, "login");
      navigate("/products");
    },
    onError: (error: Record<string, any>) => {
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

  const Logout = () => {
    setStoreAccessToken("");
    cookies.remove("access_token", { path: "/" });
    cookies.remove("refresh_token", { path: "/" });
    localStorage.removeItem("userDetails");
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
    Logout,
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
