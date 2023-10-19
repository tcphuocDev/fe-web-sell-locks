import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword } from "../../redux/actions/auth.action";
import ForgotForm from "./ForgotForm";

function Forgot(props) {
  const dispatch = useDispatch();
  const { setMode } = props;
  const handelSubmit = (values) => {
    dispatch(
      resetPassword(values, () => {
        toast.success("Lấy lại mật khẩu thành công");
        setMode("login");
      })
    );
  };
  return <ForgotForm onSubmit={handelSubmit} />;
}

export default Forgot;
