import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputField from "../../components/form-controls/InputField";
import PasswordField from "../../components/form-controls/PasswordField";
function ForgotForm(props) {
  const { onSubmit } = props;
  const schema = yup.object().shape({
    otp: yup
      .string()
      .nullable()
      .required("Vui lòng nhập mã otp")
      .min(4, "mã gồm 4 ký tự"),
    new_password: yup
      .string()
      .required("Vui lòng nhập mật khẩu mới")
      .min(6, "mật khẩu phải nhiều hơn 6 ký tự"),
    new_password_confirmation: yup
      .string()
      .required("Nhập lại mật khẩu ")
      .min(6)
      .oneOf([yup.ref("new_password")], "mật khẩu không khớp nhau"),
  });
  const form = useForm({
    defaultValues: {
      otp: "",
      password: "",
      new_password_confirmation: "",
    },
    resolver: yupResolver(schema),
  });
  const handelSubmit = (values) => {
    const params = {
      otp: values?.otp,
      password: values?.new_password,
    };
    onSubmit(params);
  };
  return (
    <div className="section-login">
      <h3 className="section-login__title">Lấy lại Mật khẩu</h3>
      <form onSubmit={form.handleSubmit(handelSubmit)}>
        <InputField
          name="otp"
          form={form}
          label="Mã OTP"
          placeholder="mã otp"
        />
        <PasswordField
          name="new_password"
          form={form}
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu"
        />
        <PasswordField
          name="new_password_confirmation"
          form={form}
          label="Xác nhận mật khẩu mới"
          placeholder="Nhập mật khẩu"
        />
        <button className="button-submit" type="submit">
          Lưu
        </button>
      </form>
    </div>
  );
}

export default ForgotForm;
