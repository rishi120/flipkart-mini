import { Navigate } from "react-router";
import { ChildrenPropsI } from "../interface";
import { useAuthContext } from "../utils/hooks";

const PrivateRoute = ({ children }: ChildrenPropsI) => {
  const { storeAccessToken } = useAuthContext();

  if (!storeAccessToken) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
