import Products from "./Products";
import ModuleWrapper from "../../layouts/ModuleWrapper";
import { useAuthContext, useProductsContext } from "../../utils/hooks";

const ProductsWrapper = () => {
  const { userDetails } = useAuthContext();
  const { setModalOpen, modalOpen } = useProductsContext();

  const handleAddProduct = () => {
    setModalOpen(true);
  };

  return (
    <ModuleWrapper
      moduleHeading="Products"
      showModuleBtn={userDetails?.role === "ADMIN"}
      buttonText="Add Products"
      handleModuleBtn={handleAddProduct}
    >
      <Products modalOpen={modalOpen} />
    </ModuleWrapper>
  );
};

export default ProductsWrapper;
