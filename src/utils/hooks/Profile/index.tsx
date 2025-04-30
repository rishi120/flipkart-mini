/** third party imports */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, createContext, useState } from "react";

/** local imports */
import {
  fetchUserProfile,
  updateCurrentPassword,
  fetchUserAddress,
  addNewAddress,
} from "../../controllers/Profile";
import { ChildrenPropsI } from "../../../interface";
import { showSuccessMessage } from "../../utilities/Helper";

const createProfileContext = createContext<any>(null);
export const useProfileContext = () => useContext(createProfileContext);

const useProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const useGetProfileDetails = () =>
    useQuery({
      queryKey: ["profileDetails"],
      queryFn: fetchUserProfile,
      enabled: true,
      select: (data) => data.data,
      gcTime: 0,
    });

  const queryClient = useQueryClient();

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
        const { message, statusCode } = data?.data ?? {};
        showSuccessMessage(message, statusCode);
      },
      onError: (error: Record<string, any>) => {
        const errorObj = error?.response?.data;
        console.log(errorObj, "errorObj");
      },
    });

  /** use mutation for adding new address */
  const { mutate: mutateAddNewAddress, isPending: isAddressAdded } =
    useMutation({
      mutationFn: addNewAddress,
      onSuccess: (data) => {
        console.log(data, "data");
        const { message, statusCode } = data?.data ?? {};
        setOpenModal(false);
        showSuccessMessage(message, statusCode);
        queryClient.refetchQueries({ queryKey: ["userAddress"] });
      },
      onError: (error: Record<string, any>) => {
        const errorObj = error?.response?.data;
        console.log(errorObj, "errorObj");
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

    // for opening the modal
    openModal,
    setOpenModal,

    // for adding new address
    mutateAddNewAddress,
    isAddressAdded,
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
