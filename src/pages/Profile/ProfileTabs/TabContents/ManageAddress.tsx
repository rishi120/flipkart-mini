/** third party imports */
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Divider, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSquareIcon from "@mui/icons-material/EditSquare";

/** local imports */

import Loader from "../../../../components/Loader";
import { useProfileContext } from "../../../../utils/hooks";
import styles from "../../Profile.module.scss";
import NoDataFound from "../../../../components/NoDataFound";
import CustomModal from "../../../../components/Modal";
import ModalContent from "./ModalContent";
import CustomButton from "../../../../components/Button";

const ManageAddress = () => {
  const { useGetUserAddress, openModal, setOpenModal } = useProfileContext();
  const { data, isPending: isUserAddressLoading } = useGetUserAddress();

  console.log(data, "data");

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div className={styles.ManageAddress}>
        {isUserAddressLoading ? (
          <Loader type="table" />
        ) : (
          <div className={styles.cardLayout}>
            {data?.data?.addresses?.length === 0 ? (
              <div className={styles.noDataFound}>
                <NoDataFound
                  heading="No Address Found"
                  description="You have not added any address yet."
                  buttonName="Add Address"
                  handleBtn={handleOpenModal}
                  showButton={true}
                />
              </div>
            ) : (
              <div className={styles.addressContainer}>
                {data?.data?.addresses?.map((address: any) => (
                  <>
                    <div key={address._id} className={styles.addressCard}>
                      <p>{address.addressLine1}</p>
                      <p>{address.addressLine2}</p>
                      <p>{address.country}</p>
                      <p>{address.street}</p>
                      <p>{address.city}</p>
                      <p>{address.state}</p>
                      <p>{address.pincode}</p>
                      <Stack
                        direction="row"
                        spacing={1}
                        position="absolute"
                        right="20px"
                        top="20px"
                      >
                        <IconButton>
                          <DeleteIcon color="error" />
                        </IconButton>
                        <IconButton onClick={handleOpenModal}>
                          <EditSquareIcon color="secondary" />
                        </IconButton>
                      </Stack>
                    </div>
                    {data?.data?.addresses?.length > 1 && <Divider flexItem />}
                  </>
                ))}
                <Divider flexItem />
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="flex-end"
                  paddingTop={2}
                >
                  <CustomButton
                    variant="contained"
                    color="primary2"
                    onClick={handleOpenModal}
                  >
                    Add New Address
                  </CustomButton>
                </Stack>
              </div>
            )}
          </div>
        )}
      </div>
      <CustomModal
        open={openModal}
        handleClose={handleModalClose}
        maxWidth="md"
        fullWidth
        modalHeaderIcon={<AddCircleOutlineIcon />}
        modalHeaderText="Add Address"
      >
        <ModalContent handleClose={handleModalClose} />
      </CustomModal>
    </>
  );
};

export default ManageAddress;
