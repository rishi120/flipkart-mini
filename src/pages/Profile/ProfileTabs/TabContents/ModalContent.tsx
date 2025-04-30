/** third party imports */
import { Grid, Box, Stack } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

/** local imports */
import styles from "../../Profile.module.scss";
import CustomButton from "../../../../components/Button";
import TextInput from "../../../../components/TextInput/TextInput";
import { AddAddressFormInputI } from "../../../../interface";
import { useProfileContext } from "../../../../utils/hooks";
import Loader from "../../../../components/Loader";

interface ModalContentPropsI {
  handleClose: () => void;
}

const ModalContent = ({ handleClose }: ModalContentPropsI) => {
  const { mutateAddNewAddress, isAddressAdded } = useProfileContext();

  const { handleSubmit, control, reset } = useForm<AddAddressFormInputI>();

  const handleFormSubmit = (data: any) => {
    console.log(data, "data");
    const formData = {
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      country: data.country,
      pincode: data.pincode,
      city: data.city,
      state: data.state,
    };

    mutateAddNewAddress(formData);

    reset({
      addressLine1: "",
      addressLine2: "",
      country: "",
      pincode: "",
      city: "",
      state: "",
    });
  };

  return (
    <div className={styles.modalContentWrapper}>
      <Box>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Controller
                name="addressLine1"
                control={control}
                rules={{
                  required: "Address is required",
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    error={!!error}
                    placeholder="Enter Address"
                    helperText={error ? error.message : null}
                    type="text"
                    variant="outlined"
                    //   className={styles.textField}
                    required
                    label="Address Line 1"
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="addressLine2"
                control={control}
                rules={{
                  required: "Address is required",
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    error={!!error}
                    placeholder="Enter Address"
                    helperText={error ? error.message : null}
                    type="text"
                    variant="outlined"
                    //   className={styles.textField}
                    required
                    label="Address Line 2"
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="country"
                control={control}
                rules={{
                  required: "Country is required",
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    error={!!error}
                    placeholder="Enter Country"
                    helperText={error ? error.message : null}
                    type="text"
                    variant="outlined"
                    //   className={styles.textField}
                    required
                    label="Country"
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="pincode"
                control={control}
                rules={{
                  required: "Pincode is required",
                  pattern: {
                    value: /^[0-9]{6}$/, // Regex for 6 digit pincode
                    message: "Pincode must be 6 digits",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    error={!!error}
                    placeholder="Enter Pincode"
                    helperText={error ? error.message : null}
                    type="number"
                    variant="outlined"
                    //   className={styles.textField}
                    required
                    label="Pincode"
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="city"
                control={control}
                rules={{
                  required: "City is required",
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    error={!!error}
                    placeholder="Enter City"
                    helperText={error ? error.message : null}
                    type="text"
                    variant="outlined"
                    //   className={styles.textField}
                    required
                    label="City"
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="state"
                control={control}
                rules={{
                  required: "State is required",
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    error={!!error}
                    placeholder="Enter State"
                    helperText={error ? error.message : null}
                    type="text"
                    variant="outlined"
                    //   className={styles.textField}
                    required
                    label="State"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Stack
            direction="row"
            spacing={2}
            display="flex"
            justifyContent="flex-end"
            paddingTop="20px"
          >
            <CustomButton
              variant="outlined"
              btnBorder="primary2"
              textColor="primary2"
              onClick={handleClose}
            >
              Cancel
            </CustomButton>
            <CustomButton
              variant="contained"
              color="primary2"
              type="submit"
              disabled={isAddressAdded}
            >
              {isAddressAdded ? <Loader type="button" /> : "Save"}
            </CustomButton>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default ModalContent;
