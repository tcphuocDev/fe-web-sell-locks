import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { updateUser, getProfile } from "../../../redux/actions/auth.action";
import GenderField from "../../../components/form-controls/GenderField";
import InputField from "../../../components/form-controls/InputField";
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function UserInformationForm(props) {
  const { changeInfo, setChangeInfo } = props;
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [changeInfo]);
  const schema = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    gender: yup
      .number()
      .required("Please enter your phone gender")
      .typeError("Please enter your phone gender"),
  });

  const form = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    form.reset({
      name: user.fullname,
      gender: user.gender,
    });
  }, [user]);
  const handleSubmit = (values) => {
    const prarams = {
      fullname: values?.name,
      gender: values?.gender,
    };

    dispatch(
      updateUser(prarams, () => {
        toast.success("Cập nhật thông tin thành công");
        dispatch(getProfile(() => setChangeInfo(!changeInfo)));
      })
    );
  };
  const handleCancel = () => {
    form.reset({
      name: user.fullname,
      gender: user.gender,
    });
  };
  return (
    <>
      <ToastContainer />
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="user-information"
      >
        <div className="left">
          <InputField name="name" form={form} label="Họ Tên" />
          <div data-tip data-for="email">
            <InputField value={user && user.email} label="Email" />
            <ReactTooltip place="top" id="email" type="info" effect="solid">
              <span style={{ display: "block", textAlign: "center" }}>
                Email không được phép sửa
              </span>
            </ReactTooltip>
          </div>
          <div data-tip data-for="phone">
            <InputField value={user && user.phone} label="Số điện thoại" />
            <ReactTooltip place="top" id="phone" type="info" effect="solid">
              <span style={{ display: "block", textAlign: "center" }}>
                Số điện thoại không được phép sửa
              </span>
            </ReactTooltip>
          </div>
          <GenderField name="gender" form={form} label="Giới tính" />
          <div style={{ display: "flex" }}>
            <button
              type="submit"
              style={{
                width: "100px",
                height: "40px",
                marginTop: "20px",
                backgroundColor: "#01adab",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Lưu
            </button>
            <button
              type="submit"
              style={{
                width: "100px",
                height: "40px",
                marginTop: "20px",
                marginLeft: "10px",
                borderRadius: "5px",
              }}
              onClick={handleCancel}
            >
              Huỷ
            </button>
          </div>
        </div>
        <div className="right"></div>
      </form>
    </>
  );
}

export default UserInformationForm;
