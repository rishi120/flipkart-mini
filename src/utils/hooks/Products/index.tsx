/** third party imports */
import { useQuery } from "@tanstack/react-query";
import { useContext, createContext, useState } from "react";
/** local imports */
import { fetchAllProducts } from "../../controllers/Product";
import { ChildrenPropsI } from "../../../interface";
// import { handleErrorCodes } from "../../utilities/Helper";

const createProductsListingContext = createContext<any>(null);
export const useProductsContext = () =>
  useContext(createProductsListingContext);

const useProductsListing = () => {
  const [modalOpen, setModalOpen] = useState(false);

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

  return {
    // for calling the get all products api
    useGetAllProducts,

    // for handling the modal states
    modalOpen,
    setModalOpen,
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
