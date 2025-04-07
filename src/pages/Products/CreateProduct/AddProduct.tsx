/** third party imports */
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
/** local imports */
import CustomModal from "../../../components/Modal";
import { useProductsContext } from "../../../utils/hooks";
import CreateProductForm from "./CreateProductForm";

const AddProduct = () => {
  const { modalOpen, setModalOpen } = useProductsContext();

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <CustomModal
      handleClose={handleModalClose}
      open={modalOpen}
      maxWidth="md"
      fullWidth
    >
      <h2>
        <AddCircleOutlineIcon />
        Add Product
      </h2>
      <CreateProductForm handleModalClose={handleModalClose} />
    </CustomModal>
  );
};

export default AddProduct;
