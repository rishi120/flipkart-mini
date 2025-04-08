import { Box, Typography, Stack } from "@mui/material";
import Modal from "@mui/material/Modal";
import CustomButton from "../Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { CustomModalI } from "../../interface";
import "./Modal.scss";
import Loader from "../Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const CustomModal = ({
  heading,
  open,
  handleClose,
  description,
  label,
  onBtnClick,
  isLoading,
}: CustomModalI) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="modalWrapper">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <ErrorOutlineIcon />
          {heading}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          display="flex"
          justifyContent="flex-end"
        >
          <CustomButton
            variant="outlined"
            color="primary"
            btnBorder="primary2"
            textColor="primary2"
            disabled={isLoading}
            onClick={handleClose}
          >
            Cancel
          </CustomButton>
          <CustomButton
            variant="contained"
            color="primary2"
            onClick={onBtnClick}
          >
            {isLoading ? <Loader type="button" /> : label}
          </CustomButton>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CustomModal;
