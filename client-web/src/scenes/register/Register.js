import { div, Button, TextField, Grid, useTheme, input } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useContext } from "react";
import { colorModeContext, tokens } from "../../theme";
import "./register.css";

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(colorModeContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
      <div className="form">
        <div className="form-right">
          <label> first Name</label>
          <input style={{ colors: colors.grey[100] }} />
          <label> first Name</label>

          <input style={{ colors: colors.grey[100] }} />
          <label> first Name</label>

          <input style={{ colors: colors.grey[400] }} />
        </div>

        <div className="form-left">
          <label> first Name</label>

          <input style={{ colors: colors.grey[100] }} />
          <label style={{ color: colors.grey[100] }}> first Name</label>
          <input style={{ colors: colors.grey[100] }} />
          <label> first Name</label>

          <input style={{ colors: colors.grey[100] }} />
        </div>
      </div>
    </div>
  );
};


export default Register;
