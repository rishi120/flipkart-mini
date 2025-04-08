import Products from "./Products";
import ModuleWrapper from "../../layouts/ModuleWrapper";
import { useProductsContext } from "../../utils/hooks";

const ProductsWrapper = () => {
  const { setModalOpen, modalOpen } = useProductsContext();

  const buttonContent = [
    {
      label: "Create Category",
      id: 1,
      handleModuleBtn: () => handleCreateCategory(),
    },
    {
      label: "Create Product",
      id: 2,
      handleModuleBtn: () => handleCreateProduct(),
    },
  ];

  const handleCreateProduct = () => {
    setModalOpen(true);
  };

  const handleCreateCategory = () => {
    console.log("category");
  };

  return (
    <ModuleWrapper moduleHeading="Products" moduleButtons={buttonContent}>
      <Products modalOpen={modalOpen} />
    </ModuleWrapper>
  );
};

export default ProductsWrapper;
