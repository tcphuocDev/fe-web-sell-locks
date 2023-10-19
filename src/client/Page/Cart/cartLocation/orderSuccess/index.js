import React from "react";
import { useNavigate } from "react-router";
import Footer from "../../../../components/Footer";
import Hearder from "../../../../components/Header";
import "./style.css";
function PaymentSuccess() {
  const navigate = useNavigate();
  return (
    <>
      <Hearder />
      <div className="payment-success">
        <h2>Đặt hàng thành công</h2>
        <div className="info">
          <p> Xin cảm ơn quý khách đã mua hàng tại Xwatch</p>
          <button className="button-back" onClick={() => navigate("/")}>
            Quay lại trang chủ
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaymentSuccess;
