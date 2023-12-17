import React from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { useTranslation } from "react-i18next";
import MonthlyTurnoverStats from "../../models/statistics/MonthlyTurnoverStats";
import { tokens } from "../../theme";
import Tooltip from "./Tooltip";

interface props {
  isDashboard: boolean;
  data: MonthlyTurnoverStats[];
}

const MonthlyTurnoverChart = ({ isDashboard = false, data = [] }: props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { t } = useTranslation();

  const keys = ["real", "estimated", "previousYear"];
  const barColors = [
    colors.greenAccent[500],
    colors.grey[600],
    colors.yellowAccent[500],
  ];
  const barLabels = [
    t("chart.real"),
    t("chart.estimated"),
    t("chart.previousYear"),
  ];

  let rawdata: any[] = [];

  data.forEach((d: MonthlyTurnoverStats) =>
    rawdata.push({
      month: d.month,
      real: d.real,
      estimated: d.estimated,
      previousYear: d.previousYear,
    })
  );

  return (
    <ResponsiveBar
      data={rawdata}
      theme={{
        // added
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
              stroke: colors.grey[100],
              strokeWidth: 1,
              opacity: 0.1,
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
        tooltip: { basic: { color: theme.palette.grey[900] } },
      }}
      tooltip={Tooltip}
      keys={keys}
      indexBy="month"
      margin={{ top: 50, right: 160, bottom: 50, left: 80 }}
      padding={0.3}
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      valueFormat=" >-.2f"
      colors={barColors}
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
            id: "previousTurnover",
          },
          id: "previous",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      minValue={0}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legend: isDashboard ? undefined : "month", // changed
        legendPosition: "middle",
        legendOffset: 32,
        format: (value) => t(`common.month.${value}`),
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "turnover", // changed
        legendPosition: "middle",
        legendOffset: -40,
        format: (value) =>
          `${Number(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} €`,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          data: keys.map((id, index) => ({
            color: barColors[index],
            id,
            label: barLabels[index],
          })),
          toggleSerie: true,
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 15,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.indexValue + " €";
      }}
    />
  );
};

export default MonthlyTurnoverChart;
