import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../../controllers/Product";
import { useContext, createContext } from "react";
import { ChildrenPropsI } from "../../../interface";
// import { handleErrorCodes } from "../../utilities/Helper";

const createProductsListingContext = createContext<any>(null);
export const useProductsContext = () =>
  useContext(createProductsListingContext);

const useProductsListing = () => {
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
    useGetAllProducts,
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
