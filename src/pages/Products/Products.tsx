/** third party imports */
import { Grid } from "@mui/material";
/** local imports */
import { useProductsContext } from "../../utils/hooks";
import LoaderOverlay from "../../components/Loader/LoaderOverlay";
import styles from "./Products.module.scss";
import AddProduct from "./CreateProduct/AddProduct";
import CreateCategory from "./CreateCategory";
import { ProductsI } from "../../interface";

const Products = ({
  modalOpen,
  setModalOpen,
  openCategoryModal,
  setOpenCategoryModal,
}: ProductsI) => {
  const { useGetAllProducts } = useProductsContext();
  const { data, isPending: isProductsLoading } = useGetAllProducts(1, 10, "");

  // console.log(data?.data, "==== products data");

  return (
    <>
      {isProductsLoading && <LoaderOverlay isLoading={isProductsLoading} />}
      <Grid container spacing={2} sx={{ paddingBottom: "50px" }}>
        {data?.data?.products.map((product: any) => (
          <Grid size={3} key={product.id}>
            <div className={styles.contentWrapper}>
              <img src={product.mainImage.url} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          </Grid>
        ))}
      </Grid>
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
