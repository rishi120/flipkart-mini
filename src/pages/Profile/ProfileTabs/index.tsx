/** third party imports */
import { useState } from "react";
import { Box, Stack, Divider } from "@mui/material";

/** local imports */

import CustomButton from "../../../components/Button";
import ProfileInfo from "./TabContents/ProfileInfo";
import ManageAddress from "./TabContents/ManageAddress";
import MyOrders from "./TabContents/Orders";

const tabConfig = [
  {
    label: "Profile Information",
    id: 1,
  },
  {
    label: "Manage Address",
    id: 2,
  },
  {
    label: "My Orders",
    id: 3,
  },
];

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <ProfileInfo />;
      case 2:
        return <ManageAddress />;
      default:
        return <MyOrders />;
    }
  };

  return (
    <Box padding="30px 0px">
      <Stack direction="row" spacing={2} alignItems="center">
        {tabConfig.map((tab) => (
          <CustomButton
            key={tab.id}
            variant="outlined"
            textColor={activeTab === tab.id ? "nuetral1" : "primary2"}
            btnBorder="primary2"
            color={activeTab === tab.id ? "primary2" : "white"}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </CustomButton>
        ))}
      </Stack>
      <Divider orientation="horizontal" sx={{ paddingTop: "20px" }} />
      {renderTabContent()}
    </Box>
  );
};

export default ProfileTabs;
