import LoginWrapper from "../pages/LoginAndRegistration";
import ProductsWrapper from "../pages/Products";
import { Routes, Route } from "react-router";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <LoginWrapper />
          </PublicRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <ProductsWrapper />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
