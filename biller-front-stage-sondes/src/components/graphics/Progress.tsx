import React from "react";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { t } from "i18next";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";

interface props {
  increase?: number;
  comparisonRef?: any;
  size: number;
  over?: boolean;
}
const Progress = ({ increase, comparisonRef, size, over = false }: props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let increaseText =
    increase !== undefined
      ? (increase > 0 ? "+" : "") +
        increase.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }) +
        (increase === Infinity ? "" : " %")
      : "";

  if (increaseText === "NaN %") increaseText = "";

  return increase !== undefined ? (
    <Tooltip
      title={t("dashboardscreen.comparedTo", {
        ref: comparisonRef,
        diff: increaseText,
      })}
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: theme.palette.primary.light,
            "& .MuiTooltip-arrow": {
              color: theme.palette.primary.light,
            },
            color: theme.palette.primary.contrastText,
            fontSize: "0.8em",
          },
        },
      }}
      placement="bottom-start"
    >
      <Box
        display="flex"
        justifyContent="start"
        flexDirection={over ? "column" : "row"}
        alignItems="center"
      >
        {increase > 0 ? (
          <TrendingUpOutlinedIcon
            sx={{
              color: colors.greenAccent[500],
              fontSize: size,
              opacity: 0.7,
            }}
          />
        ) : increase < 0 ? (
          <TrendingDownOutlinedIcon
            sx={{ color: colors.redAccent[500], fontSize: size, opacity: 0.7 }}
          />
        ) : (
          <TrendingFlatOutlinedIcon
            sx={{ color: colors.grey[500], fontSize: size, opacity: 0.7 }}
          />
        )}
        <Typography
          variant="h5"
          fontWeight="600"
          fontStyle="italic"
          mt={over ? "-20px" : 0}
          align={over ? "center" : "left"}
        >
          {increaseText}
        </Typography>
      </Box>
    </Tooltip>
  ) : (
    <></>
  );
};

export default Progress;
