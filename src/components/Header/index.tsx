import styles from "./Header.module.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import CustomModal from "../Modal";
import { useState } from "react";
import { useAuthContext } from "../../utils/hooks";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { userDetails, Logout, isLogoutLoading } = useAuthContext();

  console.log(userDetails, "==== userDetails");

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleUserLogout = () => {
    return Logout();
  };

  return (
    <header>
      <div className={styles.headerWrapper}>
        <h1>POC</h1>
        <IconButton onClick={handleModalOpen}>
          <LogoutIcon />
        </IconButton>
      </div>
      <CustomModal
        modalHeading="Logout Confirmation"
        modalParagraph=" Are you sure you want to logout? Logging out means you will no longer receive
          notifications."
        buttonLabel="Logout"
        handleClose={handleModalClose}
        open={modalOpen}
        handleModalClose={handleUserLogout}
        isLoading={isLogoutLoading}
      />
    </header>
  );
};

export default Header;
