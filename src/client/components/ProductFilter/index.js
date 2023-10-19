import React from "react";
import { Box } from "@material-ui/core";
import FilterByPrice from "./FilterbyPrice";
import FilterByCategory from "./Filtercaterogy";
const ProductFilter = ({ filters, onChange }) => {
  const handleBranchChange = (values) => {
    if (!onChange) return;
    onChange(values);
  };
  const handlePriceChange = (values) => {
    if (!onChange) return;
    onChange(values);
  };
  return (
    <Box>
      <FilterByCategory onChange={handleBranchChange} />
      <FilterByPrice onChange={handlePriceChange} />
    </Box>
  );
};
export default ProductFilter;
