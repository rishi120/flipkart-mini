import styles from "./CustomToaster.module.scss";

interface CustomToasterI {
  data: {
    title: string;
    text: string;
  };
}

const CustomToaster = ({ data }: CustomToasterI) => {
  return (
    <div className={styles.msgContainer}>
      <p
        className={styles.msgTitle}
        style={
          data.title === "Failure!"
            ? { color: "#FF4747", width: "70px" }
            : { color: "#2DCF34" }
        }
      >
        {data.title}
      </p>
      <p className={styles.msgDescription}>{data.text}</p>
    </div>
  );
};

export default CustomToaster;
