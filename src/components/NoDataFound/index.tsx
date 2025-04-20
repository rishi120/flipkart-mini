/** local imports */
import { NoDataFoundI } from "../../interface";
import styles from "./NoDataFound.module.scss";

const NoDataFound = ({ heading, description }: NoDataFoundI) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{heading}</h2>
      <p className={styles.message}>{description}</p>
    </div>
  );
};

export default NoDataFound;
