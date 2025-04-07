/** third party imports */
import { useDropzone, FileWithPath } from "react-dropzone";
import { Controller } from "react-hook-form";
/** local imports */
import styles from "../../Products.module.scss";
import TextInput from "../../../../components/TextInput/TextInput";

interface SingleFileUploadI {
  control: any;
  mainImage: string;
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}

const SingleFileUpload = ({
  control,
  mainImage,
  setFiles,
}: SingleFileUploadI) => {
  const { getRootProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles: FileWithPath[]) => {
      console.log("ruunning");
      setFiles(
        acceptedFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }))
      );
    },
  });

  return (
    <div {...getRootProps({ className: styles.dropzoneWrapper })}>
      <Controller
        control={control}
        name={mainImage}
        rules={{
          required: "File is required",
          pattern: {
            value: /\.(jpg|jpeg|png)$/i, // Accept image formats only
            message: "Only image files are allowed (jpg, jpeg, png)",
          },
          //   validate: {
          //     lessThan1MB: (value) => {
          //       console.log(value, "==== value");
          //       // Check the size of the file
          //       if (value?.[0]?.size > 1048576) {
          //         return "File size should be less than 1MB";
          //       }
          //       return true;
          //     },
          //   },
        }}
        render={({ field, fieldState: { error } }) => (
          <TextInput
            {...field}
            error={!!error}
            helperText={error ? error.message : null}
            type="file"
            variant="outlined"
            //   className={styles.textField}
            required
            label="Select Product Image"
          />
        )}
      />
    </div>
  );
};

export default SingleFileUpload;
