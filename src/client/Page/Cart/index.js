import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Hearder from "../../components/Header";
import CartEmpty from "../Cart/cartEmpty/index";
import CartHeader from "../Cart/cartHeader/CartHeader";
import CartProductList from "../Cart/cartProductList/CartProductList";
import CartTotal from "./cartTotal";
import "./style.scss";
function Cart() {
  const [changeCart, setChangeCart] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("CART")));
  }, [changeCart]);
  const countQuantity = products?.reduce((arr, cur) => arr + cur.quantity, 0);
  return (
    <>
      <Hearder changeCart={changeCart} />
      <section className="cart">
        <h2 style={{ marginLeft: "90px", marginBottom: "20px" }}>Giỏ hàng</h2>
        <div className="containers">
          <div className="cart__left">
            <CartHeader changeCart={changeCart} setChangeCart={setChangeCart} />
            {countQuantity <= 0 || countQuantity === undefined ? (
              <CartEmpty />
            ) : (
              <CartProductList
                products={products}
                changeCart={changeCart}
                setChangeCart={setChangeCart}
              />
            )}
          </div>

          {countQuantity <= 0 || countQuantity === undefined || (
            <div className="cart__right">
              <CartTotal
                // products={products}
                changeCart={changeCart}
                setChangeCart={setChangeCart}
              />
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Cart;
