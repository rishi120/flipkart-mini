/** third party imports */
import { useState } from "react";
import { Container, Divider, Grid, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
/** local imports */
import CustomButton from "../../components/Button";
import { useAuthContext } from "../../utils/hooks";
import Loader from "../../components/Loader";
import { IFormInput } from "../../interface";
import styles from "./LoginAndRegistration.module.scss";
import Registration from "./Registration/Registration";
import TextInput from "../../components/TextInput/TextInput";
import { formFieldRegex } from "../../utils/utilities/Helper";

const Login = () => {
  const { handleLogin, isLoginLoading } = useAuthContext();
  const [inputType, setInputType] = useState("password");

  const { handleSubmit, reset, control } = useForm<IFormInput>();

  const handleFormSubmit = (data: any) => {
    const requestPayload = {
      username: data.userName,
      password: data.password,
    };
    handleLogin(requestPayload);

    reset({
      password: "",
      userName: "",
    });
  };

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <Container maxWidth="lg" sx={{ height: "100%" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid size={5}>
          <div className={styles.loginWrapper}>
            <h1>Login to continue</h1>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              id="registration-form"
            >
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
                    className={styles.textField}
                    required
                    label="Username"
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                  pattern: {
                    value: formFieldRegex.password,
                    message:
                      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    error={!!error}
                    placeholder="Enter Password"
                    helperText={error ? error.message : null}
                    onChange={(e) => {
                      if (e.target.value.length <= 50) {
                        field.onChange(e);
                      }
                    }}
                    type={inputType}
                    variant="outlined"
                    className={styles.textField}
                    required
                    label="Password"
                    postContent={
                      inputType === "password" ? (
                        <VisibilityIcon
                          sx={{ cursor: "pointer" }}
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <VisibilityOffIcon
                          sx={{ cursor: "pointer" }}
                          onClick={togglePasswordVisibility}
                        />
                      )
                    }
                  />
                )}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CustomButton
                  type="submit"
                  variant="contained"
                  btnWidth="450px"
                  color="primary2"
                  disabled={isLoginLoading}
                >
                  {isLoginLoading ? <Loader type="button" /> : "Login"}
                </CustomButton>
              </Box>
            </form>
          </div>
        </Grid>
        <Grid size={2}>
          <Divider
            orientation="vertical"
            sx={{ fontFamily: "Montserrat, sans-sherif" }}
          >
            OR
          </Divider>
        </Grid>
        <Grid size={5}>
          <div className={styles.loginWrapper}>
            <Registration />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
