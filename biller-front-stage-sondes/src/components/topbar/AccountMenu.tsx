import React, { useContext } from "react";
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import AuthenticationService from "../../services/AuthenticationService";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";

import configData from "../../config.json";
import { ColorModeContext } from "../../theme";
import { useTranslation } from "react-i18next";

const AccountMenu = () => {
  const theme = useTheme();

  const colorMode = useContext(ColorModeContext);

  const { t } = useTranslation();

  return (
    <Box
      sx={{
        "& .MuiMenuItem-root:hover": {
          backgroundColor: `${theme.palette.secondary.main} !important`,
          color: `${theme.palette.primary.main} !important`,
        },
      }}
    >
      <MenuItem
        sx={{
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.75,
            mr: 1.25,
          },
        }}
      >
        {!AuthenticationService.getUser()?.hasPicture ? (
          <PersonOutlinedIcon />
        ) : (
          <Avatar
            alt={
              AuthenticationService.getUser().firstname +
              " " +
              AuthenticationService.getUser().lastname
            }
            src={`${configData.BACKEND_URL}auth/picture/${
              AuthenticationService.getUser().username
            }`}
          />
        )}
        {AuthenticationService.getUser().firstname +
          " " +
          AuthenticationService.getUser().lastname}
      </MenuItem>
      <Divider />
      <MenuItem onClick={colorMode.toggleColorMode}>
        <ListItemIcon sx={{ color: "inherit" }}>
          <SettingsBrightnessOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <Typography>
          {theme.palette.mode === "dark" ? t("darkToLight") : t("lightToDark")}
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => AuthenticationService.logout()}>
        <ListItemIcon sx={{ color: "inherit" }}>
          <LogoutOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <Typography>{t("Logout")}</Typography>
      </MenuItem>
    </Box>
  );
};

export default AccountMenu;
