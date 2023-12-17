import React from "react";
import { Box, Typography } from "@mui/material";

import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PendingStats from "../../models/statistics/PendingStats";

declare interface props {
  pendingInvoices: PendingStats;
  declareTurnover: boolean;
  setDeclareTurnover: Function;
}

const PopOverAlert = ({
  pendingInvoices,
  declareTurnover,
  setDeclareTurnover,
}: props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box>
      {/* pending invoices */}
      {pendingInvoices.total - pendingInvoices.late ? (
        <Box display="flex" alignItems="center" m="5px">
          <ReceiptOutlinedIcon color="info" />
          <Typography
            ml="5px"
            onClick={() => navigate("/invoices")}
            sx={{ cursor: "pointer" }}
          >
            {t("dashboardscreen.pendingInvoices", {
              count: pendingInvoices.total - pendingInvoices.late,
            })}
          </Typography>
        </Box>
      ) : (
        <></>
      )}

      {/* late invoices */}
      {pendingInvoices.late ? (
        <Box display="flex" alignItems="center" m="5px">
          <ReceiptOutlinedIcon color="error" />
          <Typography
            ml="5px"
            onClick={() => navigate("/invoices")}
            sx={{ cursor: "pointer" }}
          >
            {t("dashboardscreen.lateInvoices", {
              count: pendingInvoices.late,
            })}
          </Typography>
        </Box>
      ) : (
        <></>
      )}

      {/* invoices to send*/}
      {pendingInvoices.toSend ? (
        <Box display="flex" alignItems="center" m="5px">
          <ForwardToInboxOutlinedIcon color="warning" />
          <Typography
            ml="5px"
            onClick={() => navigate("/invoices")}
            sx={{ cursor: "pointer" }}
          >
            {t("dashboardscreen.invoicesToSend", {
              count: pendingInvoices.toSend,
            })}
          </Typography>
        </Box>
      ) : (
        <></>
      )}

      {/* declaration of the turnover to the administration */}
      {declareTurnover ? (
        <Box display="flex" alignItems="center" m="5px">
          <AccountBalanceOutlinedIcon color="warning" />
          <Typography
            ml="5px"
            onClick={() => {
              localStorage.setItem(
                "declareTurnover",
                "" + new Date().getMonth()
              );
              setDeclareTurnover(false);
            }}
            sx={{ cursor: "pointer" }}
          >
            {t("dashboardscreen.declareTurnover")}
          </Typography>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default PopOverAlert;
