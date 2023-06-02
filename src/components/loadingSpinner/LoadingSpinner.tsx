import React from "react";
import { CircularProgress, Box } from "@mui/material";

const LoadingSpinner: React.FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
