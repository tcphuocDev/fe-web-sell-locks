import React from "react";
import { Link, useLocation } from "react-router-dom";

function SideBarUser(props) {
  const { pathname } = useLocation();

  const listTab = [
    {
      id: 1,
      path: "/user/0",
      search: "",
      title: "Thông tin tài khoản",
      className: "category-item",
    },
    {
      id: 2,
      path: "/user/1",
      search: "",
      title: "Thay đổi mật khẩu",
      className: "category-item",
    },
    {
      id: 3,
      path: "/user/2",
      search: "",
      title: "Quản lý đơn hàng",
      className: "category-item",
    },
  ];

  return (
    <div className="side-bar-user">
      <h5>Quản Lý Tài Khoản</h5>
      <ul>
        {listTab.map((tab) => (
          <Link
            key={tab.id}
            to={tab.path + tab.search}
            className={
              pathname === tab.path ? `${tab.className} active` : tab.className
            }
          >
            {tab.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default SideBarUser;
