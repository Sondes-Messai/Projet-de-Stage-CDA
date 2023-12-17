import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { ResponsiveLine } from "@nivo/line";
import { useTranslation } from "react-i18next";
import React from "react";
import CumulatedTurnoverStats from "../../models/statistics/CumulatedTurnoverStats";
import SliceTooltip from "./SliceTooltip";

interface props {
  isDashboard: boolean;
  data: CumulatedTurnoverStats[];
}

const LineChart = ({ isDashboard = false, data }: props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const keys = ["real", "estimated", "previousYear"];
  const areaColors = [
    colors.greenAccent[500],
    colors.grey[600],
    colors.yellowAccent[500],
  ];
  const areaLabels = [
    t("chart.real"),
    t("chart.estimated"),
    t("chart.previousYear"),
  ];

  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[200],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[400],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[400],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.grey[900],
          },
        },
      }}
      enablePoints={false}
      enableSlices="x"
      colors={areaColors}
      sliceTooltip={({ slice }) => {
        return <SliceTooltip points={slice.points} />;
      }}
      defs={[
        {
          id: "estimated",
          type: "patternDots",
          background: "inherit",
          color: colors.grey[400],
          size: 1,
          padding: 1,
          stagger: true,
        },
        {
          id: "previous",
          type: "patternDots",
          background: "inherit",
          color: colors.yellowAccent[600],
          size: 3,
          padding: 1,
          stagger: true,
        },
      ]}
      fill={[
        {
          match: {
            id: "estimated",
          },
          id: "estimated",
        },
        {
          match: {
            id: "previousYear",
          },
          id: "previousYear",
        },
      ]}
      margin={{ top: 50, right: 160, bottom: 50, left: 80 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="basis"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legend: isDashboard ? undefined : "month", // added
        legendOffset: 36,
        legendPosition: "middle",
        format: (value) => t(`common.month.${value}`),
      }}
      axisLeft={{
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "turnover", // added
        legendOffset: -40,
        legendPosition: "middle",
        format: (value) =>
          `${Number(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} €`,
      }}
      enableGridX={false}
      enableGridY={true}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableArea={true}
      areaOpacity={1}
      useMesh={true}
      legends={[
        {
          anchor: "right",

          data: keys.map((id, index) => ({
            color: areaColors[index],
            id,
            label: areaLabels[index],
          })),
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 2,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 15,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
