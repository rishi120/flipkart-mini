import Products from "./Products";
import ModuleWrapper from "../../layouts/ModuleWrapper";

const ProductsWrapper = () => {
  return (
    <ModuleWrapper
      moduleHeading="Products"
      showBtn={true}
      buttonText="Add Products"
    >
      <Products />
    </ModuleWrapper>
  );
};

export default ProductsWrapper;
