import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { formatMoney } from "../../../common/common";
import { useDispatch, useSelector } from "react-redux";
import { checkCoupon } from "../../../redux/actions/coupon.action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CartTotal = ({ setCodeSale, changeCart, setChangeCart }) => {
  const [isConfirm, setIsConfirm] = useState(true);
  const [display, setDisplay] = useState(false);
  const [codeCoupon, setcodeCoupon] = useState(null);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.coupon);
  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("CART")));
  }, [changeCart]);

  const price = products?.reduce(
    (arr, cur) =>
      arr + cur.quantity * (cur?.salePrice ? cur.salePrice : cur.price),
    0
  );
  const history = useNavigate();
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/cart/order") {
      setIsConfirm(false);
      setDisplay(true);
    } else {
      setIsConfirm(true);
      setDisplay(false);
    }
  }, [location.pathname]);
  const handleClick = () => {
    history("/cart/order");
    setIsConfirm(false);
    setChangeCart(!changeCart);
    return;
  };
  const handleBack = () => {
    navigate(-1);
  };
  const handleCoupon = () => {
    if (codeCoupon) {
      dispatch(checkCoupon(codeCoupon));
    } else {
      toast.info("Vui lòng nhập mã ");
    }
  };
  return (
    <>
      <ToastContainer />
      {isConfirm ? (
        ""
      ) : (
        <div className="discount__code">
          <h2>Mã Giảm Giá</h2>
          <div className="codeSale">
            <input
              type="text"
              placeholder="Nhập mã giảm giá...."
              onChange={(e) => setcodeCoupon(e.target.value)}
            />
            <button onClick={handleCoupon}>ÁP DỤNG</button>
          </div>
        </div>
      )}

      <div className="checkout">
        <p>
          <span>Tạm Tính:</span>
          <span>{formatMoney(+price)}</span>
        </p>
        {isConfirm ? (
          ""
        ) : (
          <p>
            <span>Giảm Giá:</span>{" "}
            <span>
              {" "}
              {formatMoney(
                state?.item?.value ? (price * state?.item?.value) / 100 : 0
              ) || 0}
            </span>
          </p>
        )}
        <p>
          <span>Thành Tiền:</span>{" "}
          <span>
            {formatMoney(
              state?.item?.value
                ? price - (price * state?.item?.value) / 100
                : price
            ) || 0}
          </span>
        </p>
      </div>
      {!display && (
        <>
          <button onClick={handleClick}>TIẾN HÀNH ĐẶT HÀNG</button>
          <button className="back" onClick={handleBack}>
            QUAY LẠI
          </button>
        </>
      )}
    </>
  );
};

export default CartTotal;
