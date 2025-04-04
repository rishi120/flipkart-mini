import { ModuleWrapperI } from "../../interface";
import { Container } from "@mui/material";
import Header from "../../components/Header";
import styles from "./ModuleWrapper.module.scss";
import CustomButton from "../../components/Button";
import Stack from "@mui/material/Stack";

const ModuleWrapper = ({
  moduleHeading,
  buttonText,
  children,
  showBtn,
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
            {showBtn && (
              <CustomButton variant="contained" color="primary2">
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
