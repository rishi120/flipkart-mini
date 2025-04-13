/** third party imports */
import { Grid, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
/** local imports */
import { useProductsContext } from "../../utils/hooks";
import LoaderOverlay from "../../components/Loader/LoaderOverlay";
import styles from "./Products.module.scss";
import AddProduct from "./CreateProduct/AddProduct";
import CreateCategory from "./CreateCategory";
import { ProductsI } from "../../interface";
import DeleteModal from "../../components/Modal/Delete";

const Products = ({
  modalOpen,
  setModalOpen,
  openCategoryModal,
  setOpenCategoryModal,
}: ProductsI) => {
  const {
    useGetAllProducts,
    openDeleteModal,
    setOpenDeleteModal,
    mutateDeleteProduct,
    isProductDeleted,
  } = useProductsContext();
  const { data, isPending: isProductsLoading } = useGetAllProducts(1, 10, "");
  const [storeProductId, setStoreProductId] = useState("");

  const handleProductId = (productId: string) => {
    setStoreProductId(productId);
    setOpenDeleteModal(productId);
  };

  const handleModal = () => {
    mutateDeleteProduct(storeProductId);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  return (
    <>
      {isProductsLoading && <LoaderOverlay isLoading={isProductsLoading} />}
      <Grid container spacing={2} sx={{ paddingBottom: "50px" }}>
        {data?.data?.products.map((product: any) => (
          <Grid size={3} key={product._id}>
            <div className={styles.contentWrapper}>
              <img src={product.mainImage.url} alt="Product" />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <div className={styles.productToolBar}>
                <Stack
                  direction="row"
                  spacing={2}
                  display="flex"
                  justifyContent="flex-end"
                >
                  <IconButton onClick={() => handleProductId(product._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      <DeleteModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        isApiLoading={isProductDeleted}
        handleDelete={handleModal}
        primaryText="Are you sure you want to delete the record?  The selected record will be permanently removed."
      />
      {modalOpen && (
        <AddProduct modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      {openCategoryModal && (
        <CreateCategory
          setOpenCategoryModal={setOpenCategoryModal}
          openCategoryModal={openCategoryModal}
        />
      )}
    </>
  );
};

export default Products;
