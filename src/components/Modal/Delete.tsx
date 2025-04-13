import CustomModal from ".";
import { Stack } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CustomButton from "../Button";
import Loader from "../Loader";

interface DeleteModalI {
  open: boolean;
  onClose: () => void;
  isApiLoading?: boolean;
  handleDelete: () => void;
  primaryText: string;
}

const DeleteModal = ({
  open,
  onClose,
  isApiLoading,
  handleDelete,
  primaryText,
}: DeleteModalI) => {
  return (
    <CustomModal maxWidth="xs" fullWidth open={open} handleClose={onClose}>
      <h2>
        <ErrorOutlineIcon />
        Delete Confirmation
      </h2>
      <p>{primaryText}</p>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <CustomButton
          variant="outlined"
          btnBorder="primary2"
          textColor="primary2"
          onClick={onClose}
          disabled={isApiLoading}
        >
          Cancel
        </CustomButton>
        <CustomButton variant="contained" color="error2" onClick={handleDelete}>
          {isApiLoading ? <Loader type="button" /> : "Delete"}
        </CustomButton>
      </Stack>
    </CustomModal>
  );
};

export default DeleteModal;
