import React from "react";
import { BasicTooltip } from "@nivo/tooltip";

import { useTranslation } from "react-i18next";
import { Point } from "@nivo/line";
import { Box } from "@mui/material";

interface Slice {
  points: Point[];
}

const SliceTooltip = ({ points }: Slice) => {
  const { t } = useTranslation();

  let reversedPoints: Point[] = points.sort((a, b) => {
    return a.index - b.index;
  });

  return (
    <Box className="tooltip">
      {reversedPoints.map((point: Point) => (
        <BasicTooltip
          id={t(`chart.${point.serieId}`)}
          value={`${Number(point.data.y).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} €`}
          color={point.serieColor}
          enableChip
          key={point.id}
        />
      ))}
    </Box>
  );
};

export default SliceTooltip;
