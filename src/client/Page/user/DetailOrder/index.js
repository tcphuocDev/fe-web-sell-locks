import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { detailOrders } from "../../../redux/actions/order.action";
import { OrderStatus } from "../oder/order-status.const";
import { formatMoney } from "../../../common/common";
import { useNavigate } from "react-router";
import { ROOT_URL } from "../../../constants/config";

const DetailOrder = ({ idOrder }) => {
  const dispatch = useDispatch();
  const oderDetail = useSelector((state) => state.order);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(detailOrders(idOrder));
  }, []);
  console.log("oderDetail", oderDetail);
  return (
    <>
      <h2
        style={{
          marginTop: "-40px",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        Chi tiết đơn hàng
      </h2>
      <div className="orderDetail">
        <div className="info-user">
          <div>Thông tin khách hàng</div>
          <div className="name">
            <p>Họ Tên:</p>
            <span>{oderDetail?.item?.user?.fullname}</span>
          </div>
          <div className="name">
            <p>Số điện thoại:</p>
            <span>{oderDetail?.item?.phone}</span>
          </div>
          <div className="name">
            <p>Địa chỉ:</p>
            <span>{oderDetail?.item?.address}</span>
          </div>
        </div>
        <div className="infor-order">
          <div className="name">
            <p>Mã đơn hàng:</p>
            <span>{oderDetail?.item?.id}</span>
          </div>
          <div className="name">
            <p>Trạng thái đơn hàng:</p>
            <span>{OrderStatus[oderDetail?.item?.status]}</span>
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginTop: "15px" }}>Danh sách sản phẩm</h4>
        <table>
          <tr>
            <th>Ảnh sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>số lượng</th>
            <th>Thành tiền</th>
          </tr>
          {oderDetail?.item?.orderDetails?.map((a) => (
            <tr>
              <td>
                <img
                  src={`${ROOT_URL}/${a?.images[0]?.url}`}
                  alt="hihi"
                  style={{ width: "100px", height: "70px", padding: "2px" }}
                />
              </td>
              <td>{a?.itemName}</td>
              <td>{formatMoney(a?.orderPrice)}</td>
              <td>{a?.quantity}</td>
              <td>{formatMoney(a?.orderPrice * a?.quantity)}</td>
            </tr>
          ))}
        </table>
      </div>
      <div style={{ marginLeft: "60%" }}>
        <div className="name">
          <p>Tổng số tiền:</p>
          <span>
            {formatMoney(
              oderDetail?.item?.orderDetails?.reduce(
                (arr, cur) => arr + cur.quantity * cur?.orderPrice,
                0
              )
            )}
          </span>
        </div>
        <div className="name">
          <p>Mã giảm giá:</p>
          <span>
            {oderDetail?.item?.coupon?.value
              ? `${oderDetail?.item?.coupon?.value} %`
              : "không"}
          </span>
        </div>
        <div className="name">
          <p>Thanh toán:</p>
          <span>
            {formatMoney(
              (oderDetail?.item?.orderDetails?.reduce(
                (arr, cur) => arr + cur.quantity * cur?.orderPrice,
                0
              ) *
                (100 - oderDetail?.item?.coupon?.value || 0)) /
                100
            )}
          </span>
        </div>
      </div>
      <div>
        <button
          style={{
            marginLeft: "85%",
            marginTop: "20px",
            width: "70px",
            height: "30px",
            backgroundColor: "gray",
            borderRadius: "5px",
          }}
          onClick={() => navigate(-1)}
        >
          Quay lại
        </button>
      </div>
    </>
  );
};

export default DetailOrder;
