import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";
import StatsService from "../../services/StatsService";
import configData from "../../config.json";
import PendingStats from "../../models/statistics/PendingStats";

import { useTranslation } from "react-i18next";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PopOverMenu from "./PopOverMenu";
import PopOverAlert from "./PopOverAlert";
import AccountMenu from "./AccountMenu";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [pendingInvoices, setPendingInvoices] = useState<PendingStats>(
    new PendingStats()
  );

  const [declareTurnover, setDeclareTurnover] = useState<boolean>(true);

  const refreshPending = () => {
    try {
      StatsService.getPending()
        .then((values: PendingStats) => setPendingInvoices(values))
        .catch((reason) => console.error(reason));

      if (
        localStorage.getItem("declareTurnover") != null &&
        localStorage.getItem("declareTurnover") === "" + new Date().getMonth()
      ) {
        setDeclareTurnover(false);
      }
    } catch {}
  };

  useEffect(() => {
    // refresh at startup then each 30 secondes
    refreshPending();
    setInterval(() => {
      refreshPending();
    }, 30000);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={1}
      sx={{
        backgroundColor: colors.primary[400],
        "& button": { height: "fit-content" },
        "& .element": {
          display: "flex",
          alignItems: "center",
          minWidth: "250px",
        },
        "& .version": {
          position: "relative",
          top: "15px",
          fontStyle: "italic",
          opacity: "50%",
          fontSize: "0.8rem",
        },
      }}
    >
      {/* MENU */}
      <Box className="element">
        <Tooltip
          title={<PopOverMenu />}
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: theme.palette.primary.light,
                "& .MuiTooltip-arrow": {
                  color: theme.palette.primary.light,
                },
                color: theme.palette.primary.contrastText,
              },
            },
          }}
        >
          <Box display={"flex"}>
            <MenuOutlinedIcon />
          </Box>
        </Tooltip>
        <Typography ml="5px">{t("Menu")}</Typography>
      </Box>

      {/* Title */}
      <Box className="element">
        <Box mr="10px">
          <Box display="flex" justifyContent="center" alignItems="center">
            <img
              alt="profile-user"
              width={"30px"}
              //width={isCollapsed ? "50px" : "100px"}
              src={`../../assets/logo.png`}
            />
          </Box>
        </Box>
        <Typography variant="h1">{t("AppName")}</Typography>

        <Box className="version"> v {process.env.REACT_APP_VERSION}</Box>
      </Box>

      {/* ICONS */}
      <Box className="element" justifyContent="end">
        <Tooltip
          arrow
          placement="bottom"
          title={
            <PopOverAlert
              pendingInvoices={pendingInvoices}
              declareTurnover={declareTurnover}
              setDeclareTurnover={setDeclareTurnover}
            />
          }
          sx={{
            marginRight: "5px",
          }}
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: theme.palette.primary.light,
                "& .MuiTooltip-arrow": {
                  color: theme.palette.primary.light,
                },
                color: theme.palette.primary.contrastText,
              },
            },
          }}
        >
          <Badge
            color={
              pendingInvoices.late
                ? "error"
                : pendingInvoices.toSend || declareTurnover
                ? "warning"
                : "info"
            }
            badgeContent={
              (declareTurnover ? 1 : 0) +
              pendingInvoices.total +
              pendingInvoices.toSend
            }
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <NotificationsOutlinedIcon />
          </Badge>
        </Tooltip>

        <IconButton onClick={() => navigate("/settings")}>
          <SettingsOutlinedIcon />
        </IconButton>

        <Tooltip
          title={<AccountMenu />}
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: theme.palette.primary.light,
                "& .MuiTooltip-arrow": {
                  color: theme.palette.primary.light,
                },
                color: theme.palette.primary.contrastText,
              },
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
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Topbar;
