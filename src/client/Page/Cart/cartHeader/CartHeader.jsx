import React, { useEffect, useState } from "react";

import "./style.scss";
function CartHeader(props) {
  const { changeCart } = props;
  const [quantitycart, setQuantityCart] = useState([]);
  useEffect(() => {
    setQuantityCart(JSON.parse(localStorage.getItem("CART")));
  }, [changeCart]);
  return (
    <div className="cart__left__header">
      <p>GIỎ HÀNG</p>
      <p>({quantitycart?.length || 0} Sản Phẩm)</p>
    </div>
  );
}

export default CartHeader;
