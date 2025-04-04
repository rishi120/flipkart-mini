import { ChildrenPropsI } from "../../interface";
import { Container } from "@mui/material";
import Header from "../../components/Header";
import styles from "./ModuleWrapper.module.scss";

const ModuleWrapper = ({ children }: ChildrenPropsI) => {
  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <section className={styles.moduleWrapper}>{children}</section>
      </Container>
    </>
  );
};

export default ModuleWrapper;
