import CustomButton from "../../components/Button";
import { useAuthContext } from "../../utils/hooks";
import Loader from "../../components/Loader";
import { useForm, Controller } from "react-hook-form";
import { Container, Divider, Grid, Box } from "@mui/material";
import { IFormInput } from "../../interface";
import styles from "./LoginAndRegistration.module.scss";
import Registration from "./Registration/Registration";
import TextInput from "../../components/TextInput/TextInput";

const Login = () => {
  const { handleLogin, isLoginLoading } = useAuthContext();

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
                rules={{ required: "Password is required" }}
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
                    type="password"
                    variant="outlined"
                    className={styles.textField}
                    required
                    label="Password"
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
