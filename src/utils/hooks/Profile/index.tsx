/** third party imports */
import { useQuery, useMutation } from "@tanstack/react-query";
import { useContext, createContext } from "react";

/** local imports */
import {
  fetchUserProfile,
  updateCurrentPassword,
  fetchUserAddress,
} from "../../controllers/Profile";
import { ChildrenPropsI } from "../../../interface";
import { showSuccessMessage } from "../../utilities/Helper";
// import { handleErrorCodes } from "../../utilities/Helper";

const createProfileContext = createContext<any>(null);
export const useProfileContext = () => useContext(createProfileContext);

const useProfile = () => {
  const useGetProfileDetails = () =>
    useQuery({
      queryKey: ["profileDetails"],
      queryFn: fetchUserProfile,
      enabled: true,
      select: (data) => data.data,
      gcTime: 0,
    });

  /** use query for fetching the user address details */
  const useGetUserAddress = () =>
    useQuery({
      queryKey: ["userAddress"],
      queryFn: fetchUserAddress,
      enabled: true,
      select: (data) => data.data,
      gcTime: 0,
    });

  /** use mutation for updating the current user password */
  const { mutate: mutateCurrentPassword, isPending: isPasswordUpdated } =
    useMutation({
      mutationFn: updateCurrentPassword,
      onSuccess: (data) => {
        console.log(data, "data");
        const { message, statusCode } = data?.data;
        showSuccessMessage(message, statusCode);
      },
      onError: (error: Record<string, any>) => {
        const errorObj = error?.response?.data;
        console.log(errorObj, "errorObj");
        // handleErrorCodes(errorObj.message);
      },
    });

  return {
    // for fetching the current user profile details
    useGetProfileDetails,
    // for updating the current user password
    mutateCurrentPassword,
    isPasswordUpdated,
    // for fetching the user address details
    useGetUserAddress,
  };
};

export const ProvideProfileContext = ({ children }: ChildrenPropsI) => {
  const profileContextData = useProfile();
  return (
    <createProfileContext.Provider value={profileContextData}>
      {children}
    </createProfileContext.Provider>
  );
};
