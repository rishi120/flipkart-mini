import Products from "./Products";
import ModuleWrapper from "../../layouts/ModuleWrapper";
import { useAuthContext } from "../../utils/hooks";

const ProductsWrapper = () => {
  const { userDetails } = useAuthContext();

  return (
    <ModuleWrapper
      moduleHeading="Products"
      showModuleBtn={userDetails?.role === "ADMIN"}
      buttonText="Add Products"
    >
      <Products />
    </ModuleWrapper>
  );
};

export default ProductsWrapper;
