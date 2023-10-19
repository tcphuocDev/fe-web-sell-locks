import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrder } from "../../../redux/actions/order.action";
import { useNavigate } from "react-router-dom";
import { OrderStatus } from "./order-status.const";
import "./style.css";
import { formatMoney } from "../../../common/common";
import { Pagination } from "@mui/material";
const Order = ({ setIdOrder }) => {
  const order = useSelector((state) => state.order);
  const [filters, setFilters] = useState({ page: 1, isMe: 1 });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listOrder(filters));
  }, [filters]);
  const handleClick = (id) => {
    setIdOrder(id);
    navigate("/user/orderDetail");
  };
  const handleChange = (event, value) => {
    setFilters({
      ...filters,
      page: value,
    });
  };
  return (
    <>
      <h3 style={{ marginTop: "-20px", marginBottom: "20px" }}>
        Danh sách đơn hàng
      </h3>
      <table>
        <tr>
          <th>Mã đơn hàng</th>
          <th>Tên khách hàng</th>
          <th>Tổng tiền</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
        {order?.items?.map((item) => (
          <tr>
            <td>{item?.id}</td>
            <td>{item?.user?.fullname}</td>
            <td>
              {formatMoney(
                (item?.orderDetails?.reduce(
                  (arr, cur) => arr + cur.quantity * cur?.orderPrice,
                  0
                ) *
                  (100 - item?.coupon?.value || 0)) /
                  100
              )}
            </td>
            <td>{OrderStatus[item?.status]}</td>
            <td>
              <p
                onClick={() => handleClick(item?.id)}
                style={{ color: "red", cursor: "pointer" }}
              >
                Xem chi tiết
              </p>
            </td>
          </tr>
        ))}
      </table>
      <Pagination
        style={{
          float: "right",
          marginBottom: "40px",
          marginTop: "5px",
        }}
        count={Math.ceil(order?.meta?.total / 10)}
        page={filters?.page}
        onChange={handleChange}
      />
    </>
  );
};

export default Order;
