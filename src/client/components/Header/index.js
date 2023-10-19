import Modal from "react-modal/lib/components/Modal";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userIcon from "../../assets/img/user-icon.svg";
import ModalAuth from "../../Page/auth/ModalAuth";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModelLogin,
  logout,
  showModelLogin,
} from "../../redux/actions/auth.action";
import { isEmpty } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
Hearder.propTypes = {};
function Hearder(props) {
  const [count, setCount] = useState([]);
  const { change, changeCart, changeInfo, setFilters, filters } = props;
  const [changeUser, setChangeUser] = useState(false);
  const [user, setUser] = useState({});
  const [valueInput, setValueInput] = useState();
  const dispatch = useDispatch();
  const isOpenModal = useSelector((state) => state);
  useEffect(() => {
    setUser(JSON.parse(localStorage?.getItem("user")));
  }, [changeUser, changeInfo]);
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/find-product");
    setFilters({
      ...filters,
      keyword: valueInput,
    });
  };
  const handleInputChange = (e) => {
    setValueInput(e.target.value);
  };
  useEffect(() => {
    setCount(JSON.parse(localStorage.getItem("CART")));
  }, [change, changeCart]);
  const handleLoginLogout = () => {
    if (isEmpty(user)) {
      dispatch(showModelLogin());
    } else {
      dispatch(
        logout(() => {
          setChangeUser(!changeUser);
          navigate("/");
        })
      );
    }
  };
  const handleUser = () => {
    if (!isEmpty(user)) {
      navigate("/user/0");
    } else {
      toast.info("Vui lòng đăng nhập để xem thông tin!");
    }
  };
  return (
    <Fragment>
      <ToastContainer />
      <header>
        <Link to="/">
          <img
            src="https://xwatch.vn/images/config/logo-xwatch-216-62_1616143160.png
              "
            alt=""
            style={{ marginLeft: "50px", marginTop: "-15px", width: "200px" }}
          />
        </Link>
        <div className="header container">
          <div className="header__search">
            <div className="header__search-main">
              <input
                onChange={(e) => handleInputChange(e)}
                value={valueInput}
                placeholder="Tìm kiếm..."
              />
              <button onClick={handleSubmit}>
                <i className="fas fa-search"></i>
                <span>Tìm kiếm</span>
              </button>
            </div>
            <div className="header__search-product">
              <div className="menu">
                <div onClick={() => navigate("/")}>TRANG CHỦ</div>
                <div onClick={() => navigate("/dong-ho-nam")}>ĐỒNG HỒ NAM</div>
                <div onClick={() => navigate("/dong-ho-nu")}>ĐỒNG HỒ NỮ</div>
                <div onClick={() => navigate("/dong-ho-doi")}>ĐỒNG HỒ ĐÔI</div>
                <div onClick={() => toast.info("Chức năng đang phát triển")}>
                  GIỚI THIỆU
                </div>
                <div onClick={() => toast.info("Chức năng đang phát triển")}>
                  LIÊN HỆ
                </div>
              </div>
            </div>
          </div>
          <div className="header__cart" onClick={() => navigate("/cart")}>
            <span className="cart__noti-number">{count?.length || 0}</span>
            <i className="fas fa-shopping-cart"></i>
            <p>Giỏ hàng</p>
          </div>
          <div className="header__user">
            <img src={userIcon} alt="user logo" />

            <div className="user-log">
              <div onClick={handleLoginLogout}>
                {isEmpty(user) ? "Đăng Nhập" : "Đăng Xuất"}
              </div>
              <div onClick={handleUser}>
                {isEmpty(user) ? "Tài khoản" : user?.fullname}
              </div>
            </div>
          </div>
        </div>
      </header>
      <Modal
        isOpen={isOpenModal?.auth?.isOpenModal}
        ariaHideApp={false}
        onRequestClose={() => dispatch(closeModelLogin())}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            zIndex: "1000",
            position: "fixed",
            inset: "0",
            background: "rgba(0, 0, 0, 0.53)",
            cursor: "poiter",
          },
          content: {
            position: "absolute",
            top: "5%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            border: "none",
            background: "rgb(255, 255, 255)",
            overflow: "unset",
            borderRadius: "4px",
            outline: "none",
            padding: "0",
            transform: "translateX(-50%)",
          },
        }}
      >
        <ModalAuth changeUser={changeUser} setChangeUser={setChangeUser} />
      </Modal>
    </Fragment>
  );
}

export default Hearder;
