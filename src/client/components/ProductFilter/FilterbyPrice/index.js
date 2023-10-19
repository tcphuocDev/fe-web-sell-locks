import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

import React, { useState } from "react";

FilterByPrice.propTypes = {};
const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  range: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    "&>span": {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}));

function FilterByPrice({ onChange }) {
  const classes = useStyle();
  const [price, setPrice] = useState({
    minPrice: 0,
    maxPrice: 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    e.persist();
    setPrice({
      ...price,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    if (onChange) onChange(price);
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtittle2">Giá</Typography>
      <Box className={classes.range}>
        <TextField
          name="minPrice"
          value={price.minPrice}
          onChange={handleChange}
        />
        <span>-</span>
        <TextField
          name="maxPrice"
          value={price.maxPrice}
          onChange={handleChange}
        />
      </Box>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleSubmit}
      >
        Áp dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
