/** third party imports */
import { useForm, Controller } from "react-hook-form";
import { Stack } from "@mui/material";
/** local imports */
import CustomModal from "../../../components/Modal";
import CustomButton from "../../../components/Button";
import TextInput from "../../../components/TextInput/TextInput";
import { CreateCategoryFormInputI } from "../../../interface";
import { useCategoryContext } from "../../../utils/hooks";
import Loader from "../../../components/Loader";

interface CreateCategoryI {
  openCategoryModal: boolean;
  setOpenCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCategory = ({
  openCategoryModal,
  setOpenCategoryModal,
}: CreateCategoryI) => {
  const { handleCreateCategory, isCreatingCategory } = useCategoryContext();

  const handleModalClose = () => {
    setOpenCategoryModal(false);
  };

  const { handleSubmit, control } = useForm<CreateCategoryFormInputI>();

  const handleFormSubmit = (data: any) => {
    const requestPayload = {
      name: data.categoryName,
    };
    handleCreateCategory(requestPayload);
    setOpenCategoryModal(false);
  };

  return (
    <CustomModal
      handleClose={handleModalClose}
      open={openCategoryModal}
      maxWidth="sm"
      fullWidth
    >
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          name="categoryName"
          control={control}
          rules={{
            required: "Category Name is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              {...field}
              error={!!error}
              placeholder="Enter Category Name"
              helperText={error ? error.message : null}
              type="text"
              variant="outlined"
              //   className={styles.textField}
              required
              label="Category Name"
            />
          )}
        />
        <Stack
          direction="row"
          spacing={2}
          display="flex"
          justifyContent="flex-end"
          width="100%"
        >
          <CustomButton
            variant="outlined"
            color="primary"
            btnBorder="primary2"
            textColor="primary2"
            // disabled={isUserLoggedOut}
            onClick={handleModalClose}
            // disabled={isCreatingProduct}
          >
            Cancel
          </CustomButton>
          <CustomButton variant="contained" type="submit" color="primary2">
            {isCreatingCategory ? <Loader type="button" /> : "Create"}
          </CustomButton>
        </Stack>
      </form>
    </CustomModal>
  );
};

export default CreateCategory;
