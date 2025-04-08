import styles from "./Header.module.scss";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { IconButton } from "@mui/material";
import CustomModal from "../Modal";
import { useState } from "react";
import { useAuthContext } from "../../utils/hooks";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { useLocation, useNavigate } from "react-router";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { userLogout, isUserLoggedOut } = useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleUserLogout = () => {
    return userLogout();
  };

  type MenuItem = {
    label: string;
    icon: React.ReactElement;
    onClick?: () => void;
    path: string;
  };

  const menuItems: MenuItem[] = [
    {
      label: "Products",
      path: "/products",
      icon: <Inventory2Icon />,
      onClick: () => navigate("/products"),
    },
    {
      label: "Profile",
      path: "/profile",
      icon: <AccountBoxIcon />,
      onClick: () => navigate("/profile"),
    },
    {
      label: "Cart",
      path: "/cart",
      icon: <ShoppingCartIcon />,
      onClick: () => navigate("/cart"),
    },
    {
      label: "Logout",
      path: "#",
      icon: <ExitToAppIcon />,
      onClick: handleModalOpen,
    },
  ];

  return (
    <header>
      <div className={styles.headerWrapper}>
        <h1>POC</h1>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
        >
          {menuItems.map(({ label, path, icon, onClick }) => (
            <IconButton
              key={label}
              sx={
                location.pathname === path
                  ? { color: "#803667" }
                  : { color: "#000" }
              }
              onClick={onClick}
              aria-label={label}
            >
              <Tooltip title={label} arrow>
                {icon}
              </Tooltip>
            </IconButton>
          ))}
        </Stack>
      </div>
      <CustomModal
        heading="Logout Confirmation"
        description=" Are you sure you want to logout? Logging out means you will no longer receive
          notifications."
        label="Logout"
        handleClose={handleModalClose}
        open={modalOpen}
        onBtnClick={handleUserLogout}
        isLoading={isUserLoggedOut}
      />
    </header>
  );
};

export default Header;
