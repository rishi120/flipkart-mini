/** third party imports */
import { useQuery, useMutation } from "@tanstack/react-query";
import { useContext, createContext, useState } from "react";
/** local imports */
import { fetchAllProducts, createProducts } from "../../controllers/Product";
import { ChildrenPropsI } from "../../../interface";
import { handleErrorCodes } from "../../utilities/Helper";
// import { handleErrorCodes } from "../../utilities/Helper";

const createProductsListingContext = createContext<any>(null);
export const useProductsContext = () =>
  useContext(createProductsListingContext);

const useProductsListing = () => {
  const [modalOpen, setModalOpen] = useState(false);

  //   const queryClient = useQueryClient();

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
        console.log(data, "data");
      },
      onError: (error: Record<string, any>) => {
        const errorObj = error?.response?.data;
        handleErrorCodes(errorObj.message);
      },
    });

  const handleCreateProducts = (data: Record<string, any>) => {
    return mutateCreateProduct(data);
  };

  return {
    // for calling the get all products api
    useGetAllProducts,

    // for handling the modal states
    modalOpen,
    setModalOpen,

    // for creating products
    handleCreateProducts,
    isCreatingProduct,
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
