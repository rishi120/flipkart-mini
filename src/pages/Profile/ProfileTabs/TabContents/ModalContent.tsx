/** third party imports */
import { Grid, Box, Stack } from "@mui/material";

/** local imports */
import styles from "../../Profile.module.scss";
import CustomButton from "../../../../components/Button";

interface ModalContentPropsI {
  handleClose: () => void;
}

const ModalContent = ({ handleClose }: ModalContentPropsI) => {
  return (
    <div className={styles.modalContentWrapper}>
      <Box>
        <Grid container spacing={2}>
          <Grid size={6}>dsdsdsdsd</Grid>
          <Grid size={6}>dsdsdsdsd</Grid>
          <Grid size={6}>dsdsdsdsd</Grid>
          <Grid size={6}>dsdsdsdsd</Grid>
          <Grid size={6}>dsdsdsdsd</Grid>
          <Grid size={6}>dsdsdsdsd</Grid>
        </Grid>
        <Stack
          direction="row"
          spacing={2}
          display="flex"
          justifyContent="flex-end"
          paddingTop="20px"
        >
          <CustomButton
            variant="outlined"
            btnBorder="primary2"
            textColor="primary2"
            onClick={handleClose}
          >
            Cancel
          </CustomButton>
          <CustomButton variant="contained" color="primary2" type="submit">
            Save
          </CustomButton>
        </Stack>
      </Box>
    </div>
  );
};

export default ModalContent;
