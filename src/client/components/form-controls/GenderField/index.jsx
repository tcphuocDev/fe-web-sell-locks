import React from "react";
import { Controller } from "react-hook-form";
import "./style.scss";
function GenderField(props) {
  const { form, name, label, disable, title } = props;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, onClick, value, name },
        fieldState: { invalid, error },
      }) => {
        return (
          <div className={`input-field gender ${error ? "error" : ""}`}>
            <label>{label}</label>
            <div className="group">
              <input
                id="user-sex-male"
                value={1}
                checked={value == 1}
                disabled={disable}
                onClick={onChange}
                onBlur={onBlur}
                type="radio"
                name={name}
              />
              <label htmlFor="user-sex-male">{title ? title[0] : "Nam"}</label>
              <input
                id="user-sex-female"
                value={0}
                // eslint-disable-next-line
                checked={value == 0}
                disabled={disable}
                onClick={onChange}
                onBlur={onBlur}
                type="radio"
                name={name}
              />
              <label htmlFor="user-sex-female">{title ? title[1] : "Nữ"}</label>
              <input
                id="user-sex-other"
                value={3}
                Checked={value === 3}
                disabled={disable}
                onClick={onChange}
                onBlur={onBlur}
                type="radio"
                name={name}
              />
              <label htmlFor="user-sex-other">Khác</label>
            </div>

            {invalid && <span>{error?.message}</span>}
          </div>
        );
      }}
    />
  );
}

export default GenderField;
