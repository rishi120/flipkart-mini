import { useProfileContext } from "../../utils/hooks";
import LoaderOverlay from "../../components/Loader/LoaderOverlay";

const Profile = () => {
  const { useGetProfileDetails } = useProfileContext();

  const { data, isPending: isUserProfileLoading } = useGetProfileDetails();

  console.log(data, "==== profile data");

  return (
    <>
      {isUserProfileLoading && (
        <LoaderOverlay isLoading={isUserProfileLoading} />
      )}
      <div>...</div>
    </>
  );
};

export default Profile;
