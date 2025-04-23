/** third party imports */
import { useState } from "react";
import { Stack, Divider } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
import { formFieldRegex } from "../../utils/utilities/Helper";
import { ProfileFormInputI } from "../../interface";
import TextInput from "../../components/TextInput/TextInput";

/** local imports */
import { useProfileContext } from "../../utils/hooks";
import LoaderOverlay from "../../components/Loader/LoaderOverlay";
import { formatDate } from "../../utils/utilities/Helper";
import styles from "./Profile.module.scss";
import CustomButton from "../../components/Button";

const Profile = () => {
  const [inputType, setInputType] = useState("password");
  const { useGetProfileDetails } = useProfileContext();

  const { data, isPending: isUserProfileLoading } = useGetProfileDetails();
  const { username, ...rest } = data?.data ?? {};

  const { handleSubmit, reset, control } = useForm<ProfileFormInputI>();

  const handleFormSubmit = (data: any) => {
    // const requestPayload = {
    //   username: data.userName,
    //   password: data.password,
    // };
    // handleLogin(requestPayload);

    reset({
      currentPassword: "",
      newPassword: "",
    });
  };

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <>
      {isUserProfileLoading && (
        <LoaderOverlay isLoading={isUserProfileLoading} />
      )}
      <div className={styles.cardLayout}>
        <div className={styles.cardContentWrapper}>
          <img src="https://placehold.co/600x400" alt="user profile" />
          <div className={styles.profileContent}>
            <h1>{username}</h1>
            <p>{rest?.email}</p>
            <p>
              Role: <span>{rest?.role}</span>
            </p>
            <p>
              Created At: <span>{formatDate(rest?.createdAt)}</span>
            </p>
          </div>
          <Divider />
          <div className={styles.passwordWrapper}>
            <h3>Update Password</h3>
            <form onSubmit={handleSubmit(handleFormSubmit)} id="profile-form">
              <Controller
                control={control}
                name="currentPassword"
                rules={{ required: "password is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    {...field}
                    error={!!error}
                    placeholder="Enter Current Password"
                    helperText={error ? error.message : null}
                    type="password"
                    variant="outlined"
                    className={styles.textField}
                    required
                    label="Current Password"
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
              <Controller
                control={control}
                name="newPassword"
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
                    placeholder="Enter New Password"
                    helperText={error ? error.message : null}
                    type={inputType}
                    variant="outlined"
                    className={styles.textField}
                    required
                    label="New Password"
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
              <Stack sx={{ display: "flex", alignItems: "flex-end" }}>
                <CustomButton
                  type="submit"
                  variant="contained"
                  btnWidth="150px"
                  color="primary2"
                  // disabled={isLoginLoading}
                >
                  Update
                </CustomButton>
              </Stack>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
