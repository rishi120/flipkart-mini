import LoginWrapper from "../pages/LoginAndRegistration";
import ProductsWrapper from "../pages/Products";
import { Routes, Route } from "react-router";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import ProfileWrapper from "../pages/Profile";
import CartWrapper from "../pages/Cart";

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
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfileWrapper />
          </PrivateRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <CartWrapper />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
