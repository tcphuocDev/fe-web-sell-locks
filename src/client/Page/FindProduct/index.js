import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Hearder from "../../components/Header";
import ProductList from "../../components/ProductList";
import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import ProductSort from "../../components/ProductSort";
import { useDispatch, useSelector } from "react-redux";
import { listItem } from "../../redux/actions/item.action";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import FilterByPrice from "../../components/ProductFilter/FilterbyPrice";
import FilterByCategory from "../../components/ProductFilter/Filtercaterogy";
import { Pagination } from "@mui/material";
const useStyle = makeStyles((theme) => ({
  root: {},
  left: {
    width: "250px",
  },
  right: {
    flex: "1 1 0",
  },
}));
function FindProduct(props) {
  const classes = useStyle();
  const [filters, setFilters] = useState({ limit: 8 });
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const productList = useSelector((state) => state.item);
  useEffect(() => {
    dispatch(listItem(filters));
  }, [filters, dispatch]);
  const handlePriceChange = (newFilters) => {
    setFilters({
      ...filters,
      minPrice: newFilters?.minPrice,
      maxPrice: newFilters?.maxPrice,
    });
  };
  const handleBranchChange = (newFilters) => {
    setFilters({
      ...filters,
      branchId: newFilters,
    });
  };
  const handleSortChange = (newSortValue) => {
    setFilters({
      ...filters,
      orderPrice: newSortValue,
    });
  };
  const handleChange = (event, value) => {
    setPage(value);
    setFilters({
      ...filters,
      page: value,
    });
  };
  return (
    <>
      <Hearder setFilters={setFilters} filters={filters} />
      <div
        style={{
          paddingTop: "20px",
          paddingLeft: "62px",
          backgroundColor: "rgb(235, 231, 231)",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Trang chủ
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Tìm kiếm sản phẩm
          </Link>
        </Breadcrumbs>
      </div>
      <Box pt={3} style={{ backgroundColor: "#ebe7e7" }}>
        <Container>
          <Grid container spacing={0.5}>
            <Grid item className={classes.left}>
              <Paper elevation={0} style={{ height: "1080px" }}>
                <FilterByCategory onChange={handleBranchChange} />
                <FilterByPrice onChange={handlePriceChange} />
              </Paper>
            </Grid>
            <Grid
              item
              className={classes.right}
              style={{ backgroundColor: "white" }}
            >
              <Paper elevation={1}>
                <ProductSort
                  current={filters?.orderPrice}
                  onchange={handleSortChange}
                />
                {productList?.items ? (
                  <>
                    <ProductList data={productList?.items} />
                    <Pagination
                      style={{
                        float: "right",
                        marginBottom: "40px",
                        marginTop: "-40px",
                      }}
                      count={Math.ceil(productList.meta.total / 8)}
                      page={page}
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  ""
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default FindProduct;
