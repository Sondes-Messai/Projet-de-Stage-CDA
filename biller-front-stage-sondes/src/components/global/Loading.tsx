import React from "react";
import { Typography, Box, useTheme, LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { tokens } from "../../theme";

const Loading = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { t } = useTranslation();

  return (
    <Box
      mb="30px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Box>
        <Typography
          variant="h1"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {t("common.loading")}
        </Typography>
        <LinearProgress color={"secondary"} />
      </Box>
    </Box>
  );
};

export default Loading;
