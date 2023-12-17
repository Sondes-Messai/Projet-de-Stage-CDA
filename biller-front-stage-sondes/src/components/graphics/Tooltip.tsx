import React from "react";
import { BasicTooltip } from "@nivo/tooltip";

import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

const Tooltip = (props: any) => {
  const { t } = useTranslation();

  return (
    <Box className="tooltip">
      <BasicTooltip
        id={t(`chart.${props.id}`)}
        value={`${Number(props.value).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} €`}
        color={props.color}
        enableChip
      />
    </Box>
  );
};

export default Tooltip;
