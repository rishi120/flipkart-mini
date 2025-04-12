/** third party imports */
import { useForm, Controller } from "react-hook-form";
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";
import { useState, useEffect } from "react";
/** local imports */
import { ProductFormInputI, FilesI } from "../../../interface";
import TextInput from "../../../components/TextInput/TextInput";
import CustomButton from "../../../components/Button";
import { FormI } from "../../../interface";
import SingleFileUpload from "./FileUpload/FileUpload";
import { useProductsContext } from "../../../utils/hooks";
import Loader from "../../../components/Loader";
import { SearchableDropDown } from "../../../components/SearchableDropdown";

const CreateProductForm = ({ handleModalClose, data }: FormI) => {
  const { handleSubmit, control } = useForm<ProductFormInputI>();
  const [files, setFiles] = useState<FilesI[]>([]);
  const [options, setOptions] = useState<any[]>([]);

  const { categories } = data?.data || {};

  useEffect(() => {
    const categoryOptions = categories?.map((category: any) => ({
      label: category.name,
      value: category._id,
      labelId: category._id,
    }));
    setOptions(categoryOptions);
  }, [categories]);

  const { handleCreateProducts, isCreatingProduct } = useProductsContext();

  const handleFormSubmit = (data: any) => {
    const fileName = files.map((items: Record<string, any>) => items.file.name);

    const requestPayload = {
      category: data.category.value,
      description: data.description,
      name: data.name,
      price: data.price,
      stock: data.stock,
      mainImage: fileName[0],
    };

    handleCreateProducts(requestPayload);

    setFiles([]);

    // reset({
    //   email: "",
    //   password: "",
    //   userName: "",
    //   roles: [],
    // });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Controller
            name="category"
            control={control}
            rules={{
              required: "Category is required",
            }}
            render={({ field, fieldState: { error } }) => (
              <SearchableDropDown
                {...field}
                label="Select Category"
                options={options}
                required
                // isDisabled={isReschedule}
                error={!!error}
                helperText={error ? error.message : null}
                isSearchable={true}
              />
            )}
          />
        </Grid>

        <Grid size={6}>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field, fieldState: { error } }) => (
              <TextInput
                {...field}
                error={!!error}
                placeholder="Enter Product Name"
                helperText={error ? error.message : null}
                type="text"
                variant="outlined"
                //   className={styles.textField}
                required
                label="Product Name"
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price is required",
            }}
            render={({ field, fieldState: { error } }) => (
              <TextInput
                {...field}
                error={!!error}
                placeholder="Enter Price"
                helperText={error ? error.message : null}
                type="text"
                variant="outlined"
                //   className={styles.textField}
                required
                label="Price"
              />
            )}
          />
        </Grid>

        <Grid size={6}>
          <SingleFileUpload setFiles={setFiles} files={files} />
        </Grid>
        <Grid size={6}>
          <Controller
            name="stock"
            control={control}
            rules={{
              required: "Stock is required",
            }}
            render={({ field, fieldState: { error } }) => (
              <TextInput
                {...field}
                error={!!error}
                placeholder="Enter Stock"
                helperText={error ? error.message : null}
                type="text"
                variant="outlined"
                //   className={styles.textField}
                required
                label="Stock"
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            control={control}
            name="description"
            rules={{
              required: "Description is required",
            }}
            render={({ field, fieldState: { error } }) => (
              <TextInput
                {...field}
                name="description"
                error={!!error}
                placeholder="Enter Description"
                helperText={error ? error.message : null}
                type="text"
                variant="outlined"
                //   className={styles.textField}
                required
                label="Description"
                multiline
                rows={4}
              />
            )}
          />
        </Grid>

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
            disabled={isCreatingProduct}
          >
            Cancel
          </CustomButton>
          <CustomButton variant="contained" type="submit" color="primary2">
            {isCreatingProduct ? <Loader type="button" /> : "Add"}
          </CustomButton>
        </Stack>
      </Grid>
    </form>
  );
};

export default CreateProductForm;
