import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  closeModelLogin,
  getProfile,
  login,
} from "../../redux/actions/auth.action";
import LoginForm from "./LoginForm";

function Login(props) {
  const { changeUser, setChangeUser, setMode } = props;
  const dispatch = useDispatch();
  const handelSubmit = (values) => {
    dispatch(
      login(values, () => {
        toast.success("Đăng nhập thành công");
        dispatch(
          getProfile(() => {
            setChangeUser(!changeUser);
            dispatch(closeModelLogin());
          })
        );
      })
    );
  };
  return <LoginForm onSubmit={handelSubmit} setMode={setMode} />;
}

export default Login;
