/** third party imports */
import { Grid, Stack } from "@mui/material";
import { useState } from "react";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";

/** local imports */
import CustomButton from "../../components/Button";
import { useCartContext } from "../../utils/hooks";
import styles from "./Cart.module.scss";
import DeleteModal from "../../components/Modal/Delete";

interface CartDetailsI {
  id: string;
  quantity: number;
  products: Record<string, any>;
}

const CartDetails = ({ id, products, quantity }: CartDetailsI) => {
  const [storeProductId, setStoreProductId] = useState("");
  const { modalOpen, setModalOpen, mutateDeleteCart, isCartItemDeleted } =
    useCartContext();

  const handleRemoveItem = (productId: any) => {
    setModalOpen(productId);
    setStoreProductId(productId);
  };

  const handleModal = () => {
    return mutateDeleteCart(storeProductId);
  };

  const handleCloseDeleteModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.cartDetailsWrapper} key={id}>
      <Grid container spacing={4}>
        <Grid size={3}>
          <img src={products?.mainImage?.url} alt="" />
        </Grid>
        <Grid size={5}>
          <div className={styles.productDetails}>
            <h3>{products?.name}</h3>
            <p>{products?.description}</p>
          </div>
        </Grid>
        <Grid size={4}>
          <div className={styles.priceWrapper}>
            <p>
              Price: <span>${products?.price}</span>
            </p>
            <p>
              Stock: <span>{products?.stock}</span>
            </p>
            <p>
              Quantity: <span>{quantity}</span>
            </p>
            <Stack direction="row" justifyContent="flex-end" paddingTop="80px">
              <CustomButton
                variant="contained"
                color="primary2"
                onClick={() => handleRemoveItem(products?._id)}
              >
                Remove Item
              </CustomButton>
            </Stack>
          </div>
        </Grid>
      </Grid>
      <DeleteModal
        open={modalOpen}
        onClose={handleCloseDeleteModal}
        isApiLoading={isCartItemDeleted}
        handleDelete={handleModal}
        primaryText="Are you sure you want to remove?  The selected item will be permanently removed."
      />
    </div>
  );
};

export default CartDetails;
