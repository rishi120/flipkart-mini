/** third party imports */
import { useDropzone, FileWithPath } from "react-dropzone";
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
      "jpg/png/jpeg": [],
    },
    onDrop: (acceptedFiles: FileWithPath[]) => {
      setFiles(
        acceptedFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }))
      );
    },
    onDropRejected: (_rejectedFiles) => {
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
          {files.map((fileObj) => (
            <div key={fileObj.file.name} className={styles.innerIconWrap}>
              <CheckCircleOutlineIcon />
              <p>{fileObj.file.name}</p>
            </div>
          ))}
        </>
      )}
      {/* {files.length === 0 && <p className={styles.errorText}>dddsddsd</p>} */}
    </div>
  );
};

export default SingleFileUpload;
