import Loader from ".";
import styles from "./Loader.module.scss";
import { LoaderOverlayI } from "../../interface";

const LoaderOverlay = ({ isLoading }: LoaderOverlayI) => {
  return (
    isLoading && (
      <div className={styles.overlay}>
        <Loader />
      </div>
    )
  );
};

export default LoaderOverlay;
