import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../components/form-controls/InputField";
import PasswordField from "../../components/form-controls/PasswordField";

function LoginForm(props) {
  const { onSubmit, setMode } = props;
  const schema = yup.object().shape({
    phone: yup
      .string()
      .required("Vui lòng nhập số điện thoại")
      .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Số điện thoại không hợp lệ"),
    password: yup.string().required("Vui lòng nhập mật khẩu").min(6),
  });

  const form = useForm({
    defaultValues: {
      phone: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    const param = {
      phone: values?.phone.toString(),
      password: values?.password,
    };
    if (!onSubmit) return;
    onSubmit(param);
  };

  return (
    <div className="section-login">
      <h3 className="section-login__title">Đăng Nhập</h3>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          placeholder="Nhập số điện thoại"
          name="phone"
          form={form}
          label="Tên tài khoản"
        />
        <PasswordField
          placeholder="Nhập mật khẩu"
          name="password"
          form={form}
          label="Mật Khẩu"
        />
        <p className="forget-password">
          Quên mật khẩu? Nhấn vào
          <strong onClick={() => setMode("OTP")}> đây</strong>
        </p>
        <button className="button-submit" type="submit">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
