import React from "react";
import RegisterForm from "./RegisterForm";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/auth.action";
import { toast } from "react-toastify";

function Register(props) {
  const { setMode } = props;
  const distpatch = useDispatch();
  const handleSubmit = async (values) => {
    const params = {
      fullname: values?.name,
      phone: values?.phone,
      email: values?.email,
      password: values?.password,
      gender: values?.gender,
    };
    distpatch(
      register(params, () => {
        toast.success("Đăng ký thành công");
        setMode("login");
      })
    );
  };
  return <RegisterForm onSubmit={handleSubmit} />;
}

export default Register;
