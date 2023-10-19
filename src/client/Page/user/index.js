import React, { useState, useEffect } from "react";
import SideBarUser from "./siderBar/SideBarUser";
import UserInformationForm from "./infoUser";
import "./style.scss";
import Hearder from "../../components/Header";
import Footer from "../../components/Footer";
import Order from "./oder";
import { useParams } from "react-router-dom";
import ChangePassWord from "./changePassword";
import DetailOrder from "./DetailOrder";
function User(props) {
  const { id } = useParams();
  const [a, setA] = useState("");
  const [idOrder, setIdOrder] = useState(null);
  const [changeInfo, setChangeInfo] = useState(false);
  useEffect(() => {
    setA(getTitleHeader());
  }, [id]);
  const getTitleHeader = () => {
    switch (id) {
      case "0":
        return "THÔNG TIN TÀI KHOẢN";
      case "1":
        return "THAY ĐỔI MẬT KHẨU";
      case "2":
        return "QUẢN LÝ ĐƠN HÀNG";
      default:
        return "";
    }
  };
  return (
    <>
      <Hearder changeInfo={changeInfo} />
      <div className="user">
        <div className="container">
          <div className="user__content">
            <div className="user__left">
              <SideBarUser />
            </div>
            <div className="user__right">
              <div className="user-main">
                <div className="user-header">{a}</div>
                <div className="user-content">
                  {id === "0" ? (
                    <UserInformationForm
                      changeInfo={changeInfo}
                      setChangeInfo={setChangeInfo}
                    />
                  ) : id === "1" ? (
                    <ChangePassWord />
                  ) : id === "2" ? (
                    <Order setIdOrder={setIdOrder} />
                  ) : (
                    <DetailOrder idOrder={idOrder} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default User;
