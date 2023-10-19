import React from "react";
import "./style.scss";
function Quantity({ count, onChange }) {
  const countInt = parseInt(count);
  return (
    <div className="quantity">
      <button
        disabled={countInt <= 1 ? true : false}
        onClick={() => {
          onChange(countInt - 1);
        }}
      >
        -
      </button>
      <input
        onChange={(e) => {
          if (e.target.value <= 0 || !e.target.value) return onChange("");
          return onChange(e.target.value);
        }}
        onBlur={(e) => {
          if (e.target.value <= 0 || !e.target.value) return onChange(1);
        }}
        type="number"
        value={countInt}
      />
      <button
        onClick={() => {
          onChange(countInt + 1);
        }}
      >
        +
      </button>
    </div>
  );
}

export default Quantity;
