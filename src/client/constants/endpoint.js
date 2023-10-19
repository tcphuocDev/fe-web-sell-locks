export const Endpoint = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  CATEGORY: "/category",
  COLOR: "/color",
  COUPON: "/coupon",
  ITEM: "/item",
  ORDER: "/order",
  USER: "/user",
};

export const routers = [
  {
    endpoint: Endpoint.DASHBOARD,
    text: "Dashboard",
  },
  {
    endpoint: Endpoint.CATEGORY,
    text: "Quản lý danh mục",
  },
  {
    endpoint: Endpoint.ITEM,
    text: "Quản lý sản phẩm",
  },
  {
    endpoint: Endpoint.COLOR,
    text: "Quản lý màu sắc",
  },
  {
    endpoint: Endpoint.COUPON,
    text: "Quản lý mã giảm giá",
  },
  {
    endpoint: Endpoint.ORDER,
    text: "Quản lý đơn hàng",
  },
  {
    endpoint: Endpoint.USER,
    text: "Quản lý người dùng",
  },
];
