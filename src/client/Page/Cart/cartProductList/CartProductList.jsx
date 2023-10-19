import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import CartItem from "../cartItem/index";
import { updateCart } from "../../../redux/actions/cart.action";
function CartProductList(props) {
  const { changeCart, setChangeCart } = props;
  const [cartList, setCartList] = useState([]);
  useEffect(() => {
    setCartList(JSON.parse(localStorage.getItem("CART")));
  }, [changeCart]);
  const dispatch = useDispatch();
  const onChange = (id, quantity) => {
    const payload = {
      id: id,
      quantity: quantity,
    };
    dispatch(updateCart(payload, () => setChangeCart(!changeCart)));
  };
  return (
    <div className="cart__left__product">
      <p>
        <span>Sản Phẩm</span>
        <span>Giá</span>
        <span>Số Lượng</span>
      </p>
      {cartList &&
        cartList?.map((item, idx) => (
          <CartItem
            onChange={onChange}
            setChangeCart={setChangeCart}
            changeCart={changeCart}
            item={item}
            key={idx}
          />
        ))}
    </div>
  );
}

export default CartProductList;
