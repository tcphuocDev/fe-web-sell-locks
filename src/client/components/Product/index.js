import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { formatMoney } from "../../common/common";
import { ROOT_URL } from "../../constants/config";
import "./style.css";
function Product({ product }) {
  const history = useNavigate();
  return (
    <Box
      onClick={(e) => {
        e.preventDefault();
        history(`/product/${product.id}/detail`);
      }}
      to={`/product/${product.id}`}
      className="product"
    >
      <Box padding={1}>
        <img
          src={`${ROOT_URL}/${product?.itemImages[0]?.url}`}
          alt={product.name}
          width="100%"
          className="product_img"
        />
      </Box>
      <h3
        classeName="name "
        style={{ padding: "5px 20px", textAlign: "center", height: "70px" }}
      >
        {`${product.name.slice(0, 30)}...`}
      </h3>
      <div className="price">
        <div className={product?.salePrice > 0 ? "price-old" : "price"}>
          {formatMoney(product?.price)}
        </div>
        {product?.salePrice > 0 ? (
          <div className="price-current">{formatMoney(product?.salePrice)}</div>
        ) : (
          ""
        )}{" "}
      </div>
    </Box>
  );
}

export default Product;
