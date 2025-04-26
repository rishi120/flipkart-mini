/** third party imports */
import { Stack } from "@mui/material";

/** local imports */
import { NoDataFoundI } from "../../interface";
import styles from "./NoDataFound.module.scss";
import CustomButton from "../Button";

const NoDataFound = ({
  heading,
  description,
  buttonName,
  handleBtn,
  showButton,
}: NoDataFoundI) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{heading}</h2>
      <p className={styles.message}>{description}</p>
      <Stack
        direction={"row"}
        spacing={2}
        mt={2}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
      >
        {showButton && (
          <CustomButton
            variant="contained"
            color="primary2"
            onClick={handleBtn}
          >
            {buttonName}
          </CustomButton>
        )}
      </Stack>
    </div>
  );
};

export default NoDataFound;
