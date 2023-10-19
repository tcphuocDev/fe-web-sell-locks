import { Box, Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
ProductSekeleton.propTypes = {
  length: PropTypes.number,
};
ProductSekeleton.defaultProps = {
  length: 12,
};
function ProductSekeleton({ length }) {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Box padding={1}>
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSekeleton;
