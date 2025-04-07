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
}: CustomModalI) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <div className="modalWrapper">{children}</div>
    </Dialog>
  );
};

export default CustomModal;
