import React from "react";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import { useTranslation } from "react-i18next";
import Item from "./Item";

const PopOverMenu = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      <Item
        title={t("Dashboard")}
        to="/dashboard"
        icon={<DashboardOutlinedIcon fontSize="small" />}
      />

      <Divider />

      <Typography
        variant="h6"
        color={colors.grey[200]}
        sx={{ m: "15px 0 5px 20px" }}
      >
        {t("Data")}
      </Typography>

      <Item
        title={t("Customers")}
        to="/customers"
        icon={<PeopleOutlinedIcon fontSize="small" />}
      />
      <Item
        title={t("Services")}
        to="/services"
        icon={<SchoolOutlinedIcon fontSize="small" />}
      />
      <Item
        title={t("Invoices")}
        to="/invoices"
        icon={<ReceiptOutlinedIcon fontSize="small" />}
      />
      <Item
        title={t("AccountBalance")}
        to="/balance"
        icon={<AccountBalanceOutlinedIcon fontSize="small" />}
      />
      <Item
        title={t("Calendar")}
        to="/calendar"
        icon={<CalendarMonthOutlinedIcon fontSize="small" />}
      />
    </Box>
  );
};

export default PopOverMenu;
