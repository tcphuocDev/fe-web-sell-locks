import { Box, makeStyles, Typography } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listBranch } from "../../../redux/actions/branch.action";

FilterByCategory.propTypes = {};
const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: "none",
    "& > li": {
      marginTop: theme.spacing(1),
      transition: "all .25s",
      "&:hover": {
        color: theme.palette.primary.dark,
        cursor: "pointer",
      },
    },
  },
}));

function FilterByCategory({ onChange }) {
  // const [categoryList, setCategoryList] = useState([]);
  const [age, setAge] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.branch);
  useEffect(() => {
    dispatch(listBranch());
  }, []);
  const classes = useStyle();
  const handleChange = (e) => {
    if (!onChange) return;
    setAge(e.target.value);
    onChange(e.target.value);
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">thương hiệu</Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          style={{ height: "40px", width: " 197px" }}
        >
          <MenuItem value={null}>Tất cả</MenuItem>
          {state?.items?.map((item) => (
            <MenuItem value={item?.id}>{item?.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilterByCategory;
