import React, { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { tokens } from "../../theme";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import AuthenticationService from "../../services/AuthenticationService";

interface props {
  setIsAuthenticated: Function;
}
const Login = ({ setIsAuthenticated }: props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { t } = useTranslation();

  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: (values) => {
      AuthenticationService.login(values.login, values.password).then(
        (value) => {
          setIsAuthenticated(value);
          setError(!value);
        }
      );
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      m="20px"
      width={"100%"}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box mt="20px">
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={t("LoginForm.login")}
            value={formik.values.login}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="login"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>{" "}
        <Box mt="20px">
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label={t("LoginForm.password")}
            prefix="€"
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box display="flex" justifyContent="center" mt="20px">
          <Box>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              sx={{ pl: "20px" }}
            >
              {t("LoginForm.connect")}
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt="20px"
          color={colors.redAccent[500]}
        >
          {error ? t("LoginForm.error") : ""}
        </Box>
      </form>
    </Box>
  );
};

export default Login;
