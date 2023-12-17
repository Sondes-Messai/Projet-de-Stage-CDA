import React from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { useTranslation } from "react-i18next";
import { tokens } from "../../theme";
import MonthlyIncomesOutcomes from "../../models/statistics/MonthlyIncomesOutcomes";
import Tooltip from "./Tooltip";

interface props {
  isDashboard: boolean;
  data: MonthlyIncomesOutcomes[];
}

const MonthlyIncomeOutcome = ({ isDashboard = false, data = [] }: props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { t } = useTranslation();

  const keys = ["incomes", "outcomes"];
  const barColors = [colors.greenAccent[500], colors.redAccent[500]];
  const barLabels = [t("chart.incomes"), t("chart.outcomes")];

  let rawdata: any[] = [];

  data.forEach((d: MonthlyIncomesOutcomes) =>
    rawdata.push({ month: d.month, incomes: d.incomes, outcomes: d.outcomes })
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
      keys={keys}
      indexBy="month"
      margin={{ top: 50, right: 120, bottom: 50, left: 80 }}
      padding={0.3}
      groupMode="stacked"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      valueFormat=" >-.2f"
      colors={barColors}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
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
        legend: isDashboard ? undefined : "incomes/outcomes", // changed
        legendPosition: "middle",
        legendOffset: -40,
        format: (value) =>
          `${Number(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} €`,
      }}
      enableLabel={false}
      tooltip={Tooltip}
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

export default MonthlyIncomeOutcome;
