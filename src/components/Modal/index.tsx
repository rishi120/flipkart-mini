/** third party imports */
import { Dialog } from "@mui/material";

/** local imports */
import { CustomModalI } from "../../interface";
import "./Modal.scss";

const CustomModal = ({
  open,
  handleClose,
  maxWidth,
  fullWidth,
  children,
  modalHeaderIcon,
  modalHeaderText,
}: CustomModalI) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <div className="modalWrapper">
        <h2>
          {modalHeaderIcon}
          {modalHeaderText}
        </h2>
        {children}
      </div>
    </Dialog>
  );
};

export default CustomModal;
