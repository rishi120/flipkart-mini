/** third party imports */
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

/** local imports */

import Loader from "../../../../components/Loader";
import { useProfileContext } from "../../../../utils/hooks";
import styles from "../../Profile.module.scss";
import NoDataFound from "../../../../components/NoDataFound";
import CustomModal from "../../../../components/Modal";
import ModalContent from "./ModalContent";

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
            {data?.data?.addresses?.length === 0 && (
              <div className={styles.noDataFound}>
                <NoDataFound
                  heading="No Address Found"
                  description="You have not added any address yet."
                  buttonName="Add Address"
                  handleBtn={handleOpenModal}
                  showButton={true}
                />
              </div>
            )}
            <div className={styles.addressContainer}>
              {data?.data?.addresses?.map((address: any) => (
                <div key={address.id} className={styles.addressCard}>
                  <p>{address.addressLine1}</p>
                  <p>{address.addressLine2}</p>
                  <p>{address.country}</p>
                  <p>{address.street}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.pincode}</p>
                </div>
              ))}
            </div>
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
