/** third party imports */
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
/** local imports */
import { ModuleWrapperI } from "../../interface";
import Header from "../../components/Header";
import styles from "./ModuleWrapper.module.scss";
import CustomButton from "../../components/Button";
import { useAuthContext } from "../../utils/hooks";
import LoaderOverlay from "../../components/Loader/LoaderOverlay";

const ModuleWrapper = ({
  moduleHeading,
  moduleButtons,
  children,
}: ModuleWrapperI) => {
  const { userDetails, isFetchingAccessToken } = useAuthContext();

  return (
    <>
      {isFetchingAccessToken && (
        <LoaderOverlay isLoading={isFetchingAccessToken} />
      )}
      <Header />
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <section className={styles.moduleWrapper}>
          <div className={styles.moduleToolbar}>
            <h1>{moduleHeading}</h1>
            <Stack
              direction={"row"}
              spacing={2}
              display="flex"
              justifyContent="flex-end"
            >
              {userDetails?.role === "ADMIN" &&
                moduleButtons?.map(
                  (items: {
                    label: any;
                    id: any;
                    handleModuleBtn: () => void;
                  }) => {
                    return (
                      <CustomButton
                        key={items.id}
                        variant="contained"
                        color="primary2"
                        onClick={items.handleModuleBtn}
                      >
                        {items.label}
                      </CustomButton>
                    );
                  }
                )}
            </Stack>
          </div>
          {children}
        </section>
      </Container>
    </>
  );
};

export default ModuleWrapper;
