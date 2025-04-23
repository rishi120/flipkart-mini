/** third party imports */
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
/** local imports */
import CustomModal from "../../../components/Modal";
import CreateProductForm from "./CreateProductForm";
import { useCategoryContext } from "../../../utils/hooks";
import Loader from "../../../components/Loader";

interface AddProductI {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProduct = ({ modalOpen, setModalOpen }: AddProductI) => {
  const { useGetAllCategories } = useCategoryContext();
  const { data, isPending } = useGetAllCategories(1, 10);

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
      {isPending ? (
        <Loader />
      ) : (
        <>
          <h2>
            <AddCircleOutlineIcon />
            Add Product
          </h2>
          <CreateProductForm handleModalClose={handleModalClose} data={data} />
        </>
      )}
    </CustomModal>
  );
};

export default AddProduct;
