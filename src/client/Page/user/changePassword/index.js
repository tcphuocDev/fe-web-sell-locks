import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import PasswordField from "../../../components/form-controls/PasswordField";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../redux/actions/auth.action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ChangePassWord = () => {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    old_password: yup
      .string()
      .nullable()
      .required("Vui lòng nhập mật khẩu")
      .min(6),
    new_password: yup.string().required("Vui lòng nhập mật khẩu mới").min(6),
    new_password_confirmation: yup
      .string()
      .required("Vui lòng nhập lại mật khẩu mới")
      .min(6)
      .oneOf([yup.ref("new_password")], "Mật khẩu không trùng khớp"),
  });
  const form = useForm({
    defaultValues: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    resolver: yupResolver(schema),
  });
  const handelSubmit = (values) => {
    const params = {
      oldPassword: values?.old_password,
      newPassword: values?.new_password,
    };
    dispatch(
      changePassword(params, () => {
        toast.success("Cập nhật mật khẩu thành công");
        form.reset({
          old_password: "",
          new_password: "",
          new_password_confirmation: "",
        });
      })
    );
  };
  return (
    <>
      <ToastContainer />
      <div
        className="section-login"
        style={{ width: "500px", marginTop: "-20px" }}
      >
        <form onSubmit={form.handleSubmit(handelSubmit)}>
          <PasswordField
            name="old_password"
            form={form}
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
          />
          <PasswordField
            name="new_password"
            form={form}
            label="Mật khẩu mới"
            placeholder="Mật khẩu từ 6 đến 32 ký tự"
          />
          <PasswordField
            name="new_password_confirmation"
            form={form}
            label="Xác nhận mật khẩu mới"
            placeholder="Mật khẩu từ 6 đến 32 ký tự"
          />
          <button
            type="submit"
            style={{
              width: "100px",
              height: "40px",
              marginTop: "20px",
              backgroundColor: "#01adab",
              borderRadius: "7px",
              borderColor: "#01adab",
              color: "white",
            }}
          >
            Lưu
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassWord;
