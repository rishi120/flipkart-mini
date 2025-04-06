import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../../controllers/Profile";
import { useContext, createContext } from "react";
import { ChildrenPropsI } from "../../../interface";
// import { handleErrorCodes } from "../../utilities/Helper";

const createProfileContext = createContext<any>(null);
export const useProfileContext = () => useContext(createProfileContext);

const useProfile = () => {
  const useGetProfileDetails = () =>
    useQuery({
      queryKey: ["profileDetails"],
      queryFn: fetchUserProfile,
      enabled: true,
      select: (data) => data.data,
      gcTime: 0,
    });

  return {
    useGetProfileDetails,
  };
};

export const ProvideProfileContext = ({ children }: ChildrenPropsI) => {
  const profileContextData = useProfile();
  return (
    <createProfileContext.Provider value={profileContextData}>
      {children}
    </createProfileContext.Provider>
  );
};
