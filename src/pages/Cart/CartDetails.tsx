/** third party imports */
import { Grid, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

/** local imports */
import CustomButton from "../../components/Button";
import { useCartContext } from "../../utils/hooks";
import styles from "./Cart.module.scss";
import DeleteModal from "../../components/Modal/Delete";
import Loader from "../../components/Loader";

interface CartDetailsI {
  id: string;
  quantity: number;
  products: Record<string, any>;
  handleAddToCart: (
    productId: string,
    requestPayload: Record<string, any>
  ) => void;
  quantityLoading: Record<string, boolean>;
  setQuantityLoading: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

const CartDetails = ({
  id,
  products,
  quantity,
  handleAddToCart,
  quantityLoading,
  setQuantityLoading,
}: CartDetailsI) => {
  const [storeProductId, setStoreProductId] = useState<any>("");
  const [counter, setCounter] = useState(quantity);
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

  const handleCounterIncrement = (productId: string) => {
    setCounter(quantity + 1);
    setQuantityLoading((prevQuantity) => ({
      ...prevQuantity,
      [productId]: true,
    }));
    const requestPayload = {
      quantity: counter + 1,
    };
    return handleAddToCart(productId, requestPayload);
  };

  const handleCounterDecrement = (productId: any) => {
    setQuantityLoading((prevQuantity) => ({
      ...prevQuantity,
      [productId]: true,
    }));
    setCounter(counter - 1);
    setStoreProductId(productId);
  };

  useEffect(() => {
    if (counter > 1) {
      const requestPayload = {
        quantity: counter - 1,
      };
      handleAddToCart(storeProductId, requestPayload);
    } else {
      setModalOpen(storeProductId);
    }
  }, [counter]);

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
            <Stack
              direction="row"
              justifyContent="space-between"
              paddingTop="80px"
            >
              <div className={styles.counter}>
                {quantityLoading[products?._id] ? (
                  <Loader type="button" />
                ) : (
                  <>
                    <IconButton
                      onClick={() => handleCounterDecrement(products?._id)}
                      disabled={counter <= 0}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <span>{counter}</span>
                    <IconButton
                      onClick={() => handleCounterIncrement(products?._id)}
                    >
                      <AddIcon />
                    </IconButton>
                  </>
                )}
              </div>
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
