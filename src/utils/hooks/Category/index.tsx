/** third party imports */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, createContext } from "react";
/** local imports */
import { CreateCategory, getAllCategories } from "../../controllers/Category";
// import { handleErrorCodes } from "../../utilities/Helper";
import { showSuccessMessage } from "../../utilities/Helper";
import { ChildrenPropsI } from "../../../interface";

const CreateCategoryContext = createContext<any>(null);
export const useCategoryContext = () => useContext(CreateCategoryContext);

const useCategory = () => {
  const queryClient = useQueryClient();

  const useGetAllCategories = (page: number, limit: number) =>
    useQuery({
      queryKey: ["categories"],
      queryFn: () => getAllCategories(page, limit),
      enabled: true,
      select: (data) => data.data,
      gcTime: 0,
    });

  /** use mutation for creating category */
  const { mutate: mutateCreateCategory, isPending: isCreatingCategory } =
    useMutation({
      mutationFn: CreateCategory,
      onSuccess: (data) => {
        console.log(data, "data");
        const { message, statusCode } = data?.data;
        showSuccessMessage(message, statusCode);
        queryClient.refetchQueries({ queryKey: ["categories"] });
      },
      onError: (error: Record<string, any>) => {
        const errorObj = error?.response?.data;
        console.log(errorObj, "errorObj");
        // handleErrorCodes(errorObj.message);
      },
    });

  const handleCreateCategory = (CategoryName: string) => {
    return mutateCreateCategory(CategoryName);
  };

  return {
    // for creating products
    handleCreateCategory,
    isCreatingCategory,

    // retrieving all categories
    useGetAllCategories,
  };
};

export const CreateCategoryProvider = ({ children }: ChildrenPropsI) => {
  const value = useCategory();
  return (
    <CreateCategoryContext.Provider value={value}>
      {children}
    </CreateCategoryContext.Provider>
  );
};
