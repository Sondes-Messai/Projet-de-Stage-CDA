import React, { ReactElement } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Progress from "./Progress";

interface props {
  title: string;
  unformattedTitle?: string;
  subtitle?: string | null;
  icon: ReactElement;
  progress?: number;
  increase?: number;
  warningValue?: number;
  errorValue?: number;
  comparisonRef: any;
}

const StatBox = ({
  title,
  unformattedTitle,
  subtitle,
  icon,
  progress,
  increase,
  warningValue,
  errorValue,
  comparisonRef,
}: props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 10px">
      <Box display="flex" justifyContent="space-between">
        <Box sx={{ color: theme.palette.secondary.main }}>
          <>
            {icon}
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                color:
                  unformattedTitle &&
                  errorValue &&
                  +unformattedTitle >= errorValue
                    ? colors.redAccent[400]
                    : unformattedTitle &&
                      warningValue &&
                      +unformattedTitle >= warningValue
                    ? colors.yellowAccent[400]
                    : colors.grey[100],
              }}
            >
              {title}
            </Typography>
          </>
        </Box>
        <Box className="progress">
          <Progress
            increase={increase ? increase : progress}
            comparisonRef={comparisonRef}
            size={80}
            over={true}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography
          variant="h5"
          fontWeight="600"
          sx={{
            color: theme.palette.secondary.main,
            maxHeight: "22px",
            overflow: "clip",
            wordWrap: "break-word",
            whiteSpace: "nowrap",
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
