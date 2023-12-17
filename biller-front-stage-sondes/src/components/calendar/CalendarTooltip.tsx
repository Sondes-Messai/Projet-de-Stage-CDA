import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const CalendarTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    maxWidth: 600,
  },
  "& .MuiTooltip-arrow": {
    color: theme.palette.primary.light,
  },
}));

export default CalendarTooltip;
