import React from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";

const Dashboards = () => {
  return (
    <Box m="20px">
      <Box>
        <Header title={"Dashboard"} subtitle={"welcome to your dashboard"} />
      </Box>
    </Box>
  );
};

export default Dashboards;
