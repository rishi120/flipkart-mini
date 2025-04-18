/** third party imports */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, createContext, useState } from "react";
/** local imports */
import {
  fetchAllProducts,
  createProducts,
  deleteProduct,
  addToCart,
} from "../../controllers/Product";
import { ChildrenPropsI } from "../../../interface";
import { handleErrorCodes, showSuccessMessage } from "../../utilities/Helper";

const createProductsListingContext = createContext<any>(null);
export const useProductsContext = () =>
  useContext(createProductsListingContext);

const useProductsListing = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState({});

  const useGetAllProducts = (
    page: number,
    limit: number,
    productId: string | number
  ) =>
    useQuery({
      queryKey: ["productDetails"],
      queryFn: () => fetchAllProducts(page, limit, productId),
      enabled: true,
      select: (data) => data.data,
      gcTime: 0,
    });

  /** use mutation for creating products */

  const { mutate: mutateCreateProduct, isPending: isCreatingProduct } =
    useMutation({
      mutationFn: createProducts,
      onSuccess: (data) => {
        if (data?.data?.statusCode === 201) {
          const successMessage = data?.data?.message;
          showSuccessMessage(successMessage, "toast1");
          setModalOpen(false);
        }
        queryClient.refetchQueries({ queryKey: ["productDetails"] });
      },
      onError: (error: Record<string, any>) => {
        const errorObj = error?.response?.data;
        handleErrorCodes(errorObj.message);
      },
    });

  /** use mutation for deleting product */

  const { mutate: mutateDeleteProduct, isPending: isProductDeleted } =
    useMutation({
      mutationFn: deleteProduct,
      onSuccess: (data) => {
        if (data?.data?.statusCode === 200) {
          const successMessage = data?.data?.message;
          showSuccessMessage(successMessage, "toast1");
          setOpenDeleteModal(false);
        }
        queryClient.refetchQueries({ queryKey: ["productDetails"] });
      },
      onError: (error: Record<string, any>) => {
        const errorObj = error?.response?.data;
        handleErrorCodes(errorObj.message);
      },
    });

  /** use mutation for adding product to the cart */

  const { mutate: mutateAddProductToCart } = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      console.log(data, "data");
      const { message, statusCode } = data?.data ?? {};
      if (statusCode === 200) {
        showSuccessMessage(message, "toast1");
        setIsLoadingProduct({});
      }
    },
    onError: (error: Record<string, any>) => {
      const errorObj = error?.response?.data;
      handleErrorCodes(errorObj.message);
    },
  });

  const handleCreateProducts = (data: Record<string, any>) => {
    return mutateCreateProduct(data);
  };

  const handleAddToCart = (productId: string) => {
    return mutateAddProductToCart(productId);
  };

  return {
    // for calling the get all products api
    useGetAllProducts,

    // for creating products
    handleCreateProducts,
    isCreatingProduct,

    // for handling the create product form modal
    modalOpen,
    setModalOpen,

    // for deleting a product
    mutateDeleteProduct,
    isProductDeleted,
    setOpenDeleteModal,
    openDeleteModal,

    // for calling the add to cart api and handling the isLoading states
    handleAddToCart,
    setIsLoadingProduct,
    isLoadingProduct,
  };
};

export const ProvideProductContext = ({ children }: ChildrenPropsI) => {
  const productsListingContextData = useProductsListing();
  return (
    <createProductsListingContext.Provider value={productsListingContextData}>
      {children}
    </createProductsListingContext.Provider>
  );
};
