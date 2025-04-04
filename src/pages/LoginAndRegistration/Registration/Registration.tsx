import CustomButton from "../../../components/Button";
import { IFormInput } from "../../../interface";
import Loader from "../../../components/Loader";
import TextInput from "../../../components/TextInput/TextInput";
import { useForm, Controller } from "react-hook-form";
import { SearchableDropDown } from "../../../components/SearchableDropdown";
import { Box } from "@mui/material";
import { useAuthContext } from "../../../utils/hooks";

export const Registration = () => {
  const { handleRegistration, isRegistrationLoading } = useAuthContext();

  const { handleSubmit, reset, control } = useForm<IFormInput>();

  const handleFormSubmit = (data: any) => {
    const requestPayload = {
      email: data.email,
      password: data.password,
      username: data.userName,
      role: data.roles.label.toUpperCase(),
    };

    handleRegistration(requestPayload);

    reset({
      email: "",
      password: "",
      userName: "",
      roles: [],
    });
  };

  const options: any[] = [
    {
      label: "User",
      value: 1,
      labelId: 1,
    },
    {
      label: "Admin",
      value: 2,
      labelId: 2,
    },
  ];

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              {...field}
              error={!!error}
              placeholder="Enter Email"
              helperText={error ? error.message : null}
              onChange={(e) => {
                if (e.target.value.length <= 50) {
                  field.onChange(e);
                }
              }}
              type="email"
              variant="outlined"
              //   className={styles.textField}
              required
              label="Email"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            // pattern: {
            //   value:
            //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            //   message:
            //     "Password must be at least 8 characters long, and must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
            // },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              {...field}
              error={!!error}
              placeholder="Enter Password"
              helperText={error ? error.message : null}
              type="password"
              variant="outlined"
              //   className={styles.textField}
              required
              label="Password"
            />
          )}
        />
        <Controller
          control={control}
          name="userName"
          rules={{ required: "Username is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              {...field}
              error={!!error}
              placeholder="Enter Username"
              helperText={error ? error.message : null}
              onChange={(e) => {
                if (e.target.value.length <= 50) {
                  field.onChange(e);
                }
              }}
              type="text"
              variant="outlined"
              //   className={styles.textField}
              required
              label="Username"
            />
          )}
        />
        <Controller
          name="roles"
          control={control}
          rules={{
            required: "Roles is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <SearchableDropDown
              {...field}
              label="Select Roles"
              options={options}
              required
              // isDisabled={isReschedule}
              error={!!error}
              helperText={error ? error.message : null}
              onChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
        />
        <Box
          sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
        >
          <CustomButton
            type="submit"
            variant="contained"
            btnWidth="450px"
            color="primary2"
            // onClick={handleLogin}
            disabled={isRegistrationLoading}
          >
            {isRegistrationLoading ? <Loader type="button" /> : "Sign Up"}
          </CustomButton>
        </Box>
      </form>
    </>
  );
};

export default Registration;
