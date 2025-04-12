/** third party imports */
import { useState } from "react";
/** local imports */
import Products from "./Products";
import ModuleWrapper from "../../layouts/ModuleWrapper";

const ProductsWrapper = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

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
    setOpenCategoryModal(true);
  };

  return (
    <ModuleWrapper moduleHeading="Products" moduleButtons={buttonContent}>
      <Products
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        openCategoryModal={openCategoryModal}
        setOpenCategoryModal={setOpenCategoryModal}
      />
    </ModuleWrapper>
  );
};

export default ProductsWrapper;
