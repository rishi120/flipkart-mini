/** third party imports */
import { useDropzone } from "react-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
/** local imports */
import styles from "../../Products.module.scss";
import { handleErrorCodes } from "../../../../utils/utilities/Helper";

interface SingleFileUploadI {
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  files: any[];
}

const SingleFileUpload = ({ setFiles, files }: SingleFileUploadI) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      png: [],
      jpg: [],
      jpeg: [],
    },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        // You can add other data to formData if needed, like preview URL
        return file;
      });
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
    onDropRejected: () => {
      handleErrorCodes("Only images are allowed");
    },
  });

  return (
    <div {...getRootProps({ className: styles.dropzoneWrapper })}>
      <p>
        Select Image <span>*</span>
      </p>
      {files.length == 0 && (
        <>
          <input
            {...getInputProps()}
            type="file"
            data-testid="dropzone"
            className={styles.dropzoneInput}
          />
          <div className={styles.innerIconWrap}>
            <UploadFileIcon />
            <p>Select or drop document here</p>
          </div>
        </>
      )}
      {/* Display uploaded file previews */}
      {files.length > 0 && (
        <>
          {files?.map((fileObj) => {
            return (
              <div key={fileObj?.name} className={styles.innerIconWrap}>
                <CheckCircleOutlineIcon />
                <p>{fileObj?.name}</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default SingleFileUpload;
