import { Tab, Tabs } from "@mui/material";
import React from "react";

function ProductSort({ current, onchange }) {
  const handleSortChange = (e, newValue) => {
    if (onchange) onchange(newValue);
  };
  return (
    <Tabs
      value={current ? current : ""}
      onChange={handleSortChange}
      textColor="primary"
      indicatorColor="primary"
      aria-label="disabled tabs example"
    >
      <Tab label="Giá giảm dần " value={-1}></Tab>
      <Tab label="Giá tăng dần" value={1}></Tab>
    </Tabs>
  );
}

export default ProductSort;
