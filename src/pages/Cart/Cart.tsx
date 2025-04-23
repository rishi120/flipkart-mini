/** third party imports */
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useEffect } from "react";

/** local imports */
import { useCartContext } from "../../utils/hooks";
import LoaderOverlay from "../../components/Loader/LoaderOverlay";
import CartDetails from "./CartDetails";
import styles from "./Cart.module.scss";
import NoDataFound from "../../components/NoDataFound";

const Cart = () => {
  const { useGetUserCart, setShowCartCounter } = useCartContext();

  const { data: userCartData, isPending: isCartLoading } = useGetUserCart();
  const { cartTotal, discountedTotal } = userCartData?.data ?? {};

  useEffect(() => {
    if (userCartData) {
      setShowCartCounter(userCartData?.data?.items.length);
    }
  }, [userCartData]);

  console.log(userCartData, "userCartData");

  return (
    <div className={styles.CartWrapper}>
      <LoaderOverlay isLoading={isCartLoading} />
      {userCartData?.data?.items.length === 0 ? (
        <NoDataFound
          heading="your cart is empty!"
          description="You have not added anything to your cart yet."
        />
      ) : (
        <Grid container spacing={2}>
          <Grid size={8}>
            {userCartData?.data.items.map(
              (cartDetails: {
                _id: string;
                product: Record<string, string>;
                quantity: number;
              }) => {
                return (
                  <CartDetails
                    id={cartDetails._id}
                    quantity={cartDetails.quantity}
                    products={cartDetails.product}
                    key={cartDetails._id}
                  />
                );
              }
            )}
          </Grid>
          <Grid size={4}>
            <div className={styles.priceDetailsWrapper}>
              <h4>Price Details</h4>
              <Divider orientation="horizontal" flexItem />
              <ul>
                <li>
                  Cart Total <span>{cartTotal}</span>
                </li>
                <li>
                  Discounted Total<span>{discountedTotal}</span>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Cart;
