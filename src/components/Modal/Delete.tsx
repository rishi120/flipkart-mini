import { Stack, Dialog } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CustomButton from "../Button";
import Loader from "../Loader";
import "./Modal.scss";

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
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <div className="modalWrapper">
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
          <CustomButton
            variant="contained"
            color="error2"
            onClick={handleDelete}
          >
            {isApiLoading ? <Loader type="button" /> : "Delete"}
          </CustomButton>
        </Stack>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
