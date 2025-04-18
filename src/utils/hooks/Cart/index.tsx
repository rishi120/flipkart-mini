/** third party imports */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, createContext, useState } from "react";

/** local imports */
import { fetchUserCart, removeItemFromCart } from "../../controllers/Cart";
import { ChildrenPropsI } from "../../../interface";
import { handleErrorCodes, showSuccessMessage } from "../../utilities/Helper";

interface CreateUserCartContextI {
  useGetUserCart: () => any;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  mutateDeleteCart: any;
  isCartItemDeleted: boolean;
}

const cartInitialData = {
  useGetUserCart: () => {},
  setModalOpen: () => {},
  modalOpen: false,
  mutateDeleteCart: () => {},
  isCartItemDeleted: false,
};

const CreateUserCartContext =
  createContext<CreateUserCartContextI>(cartInitialData);
export const useCartContext = () => useContext(CreateUserCartContext);

const useCartContextData = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const useGetUserCart = () =>
    useQuery({
      queryKey: ["cartDetails"],
      queryFn: () => fetchUserCart(),
      enabled: true,
      select: (data) => data.data,
      gcTime: 0,
    });

  /** use mutation for deleting item from cart */

  const { mutate: mutateDeleteCart, isPending: isCartItemDeleted } =
    useMutation({
      mutationFn: removeItemFromCart,
      onSuccess: (data) => {
        if (data?.data?.statusCode === 200) {
          const successMessage = data?.data?.message;
          showSuccessMessage(successMessage, "toast1");
          setModalOpen(false);
          queryClient.refetchQueries({ queryKey: ["cartDetails"] });
        }
      },
      onError: (error: Record<string, any>) => {
        const errorObj = error?.response?.data;
        handleErrorCodes(errorObj.message);
      },
    });

  return {
    // for calling the user cart api
    useGetUserCart,
    // for calling the remove item from cart api
    mutateDeleteCart,
    isCartItemDeleted,

    // for handling the delete confirmation modal
    modalOpen,
    setModalOpen,
  };
};

export const CreateCartContextProvider = ({ children }: ChildrenPropsI) => {
  const userCartData = useCartContextData();
  return (
    <CreateUserCartContext.Provider value={userCartData}>
      {children}
    </CreateUserCartContext.Provider>
  );
};
