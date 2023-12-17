import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

interface props {
  progress?: number;
  size?: string;
}
const ProgressCircle = ({ progress, size = "80" }: props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress ? progress * 360 : 0;

  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.grey[600]} ${angle}deg 360deg),
            ${theme.palette.secondary.main}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
