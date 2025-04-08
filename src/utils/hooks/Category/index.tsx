/** third party imports */
import { useMutation } from "@tanstack/react-query";
import { useContext, createContext } from "react";
/** local imports */
import { CreateCategory } from "../../controllers/Category";
// import { handleErrorCodes } from "../../utilities/Helper";
import { ChildrenPropsI } from "../../../interface";

const CreateCategoryContext = createContext<any>(null);
export const useCategoryContext = () => useContext(CreateCategoryContext);

const useCategory = () => {
  /** use mutation for creating category */
  const { mutate: mutateCreateCategory, isPending: isCreatingCategory } =
    useMutation({
      mutationFn: CreateCategory,
      onSuccess: (data) => {
        console.log(data, "data");
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
