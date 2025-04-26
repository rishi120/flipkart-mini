/** local imports */

import Loader from "../../../../components/Loader";
import { useProfileContext } from "../../../../utils/hooks";
import styles from "../../Profile.module.scss";
import NoDataFound from "../../../../components/NoDataFound";

const ManageAddress = () => {
  const { useGetUserAddress } = useProfileContext();
  const { data, isPending: isUserAddressLoading } = useGetUserAddress();

  console.log(data, "data");

  return (
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
                handleBtn={() => {}}
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
  );
};

export default ManageAddress;
