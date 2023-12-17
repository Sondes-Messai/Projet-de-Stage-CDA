import React from "react";
import { Typography, Box, useTheme } from "@mui/material";

interface props {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: props) => {
  const theme = useTheme();
  return (
    <Box>
      <Box mb="30px">
        <Typography variant="h2" sx={{ m: "10px 0 5px 0" }}>
          {title}
        </Typography>
        <Typography
          variant="h5"
          fontWeight="600"
          color={theme.palette.secondary.main}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
