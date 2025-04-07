/** third party imports */
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
/** local imports */
import { ModuleWrapperI } from "../../interface";
import Header from "../../components/Header";
import styles from "./ModuleWrapper.module.scss";
import CustomButton from "../../components/Button";

const ModuleWrapper = ({
  moduleHeading,
  buttonText,
  children,
  showModuleBtn,
  handleModuleBtn,
}: ModuleWrapperI) => {
  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <section className={styles.moduleWrapper}>
          <Stack
            direction={"row"}
            spacing={2}
            display="flex"
            justifyContent="space-between"
          >
            <h1>{moduleHeading}</h1>
            {showModuleBtn && (
              <CustomButton
                variant="contained"
                color="primary2"
                onClick={handleModuleBtn}
              >
                {buttonText}
              </CustomButton>
            )}
          </Stack>
          {children}
        </section>
      </Container>
    </>
  );
};

export default ModuleWrapper;
