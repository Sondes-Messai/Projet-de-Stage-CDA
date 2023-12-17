import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../components/global/Header";
import { tokens } from "../../theme";
import LineChart from "../../components/graphics/LineChart";
import StatBox from "../../components/graphics/StatBox";
import React, { useEffect, useState } from "react";
import StatsService from "../../services/StatsService";
import CumulatedTurnoverStats from "../../models/statistics/CumulatedTurnoverStats";
import Point from "../../models/statistics/Point";
import MonthlyTurnoverChart from "../../components/graphics/MonthlyTurnoverChart";
import { useTranslation } from "react-i18next";
import MonthlyTurnoverStats from "../../models/statistics/MonthlyTurnoverStats";
import TurnoverStats from "../../models/statistics/TurnoverStats";

import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import dayOfYear from "../../helpers/dateHelper";
import CumulatedTaxe from "../../models/statistics/CumulatedTaxe";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { t } = useTranslation();

  const [newCustomers, setNewCustomers] = useState<number>(0);
  const [activeCustomers, setActiveCustomers] = useState<number>(0);

  const [newCustomersLastYear, setNewCustomersLastYear] = useState<number>(0);
  const [activeCustomersLastYear, setActiveCustomersLastYear] =
    useState<number>(0);

  const [turnover, setTurnover] = useState<TurnoverStats>(
    new TurnoverStats(0, 0, 0, 0)
  );

  const [monthlyTurnover, setMonthlyTurnover] = useState<
    MonthlyTurnoverStats[]
  >([]);

  const [yearToDisplay, setYearToDisplay] = useState<number>(
    new Date().getFullYear()
  );

  const [taxe, setTaxe] = useState<CumulatedTaxe>(new CumulatedTaxe(0, 0, 0));
  const [taxeLastYear, setTaxeLastYear] = useState<CumulatedTaxe>(
    new CumulatedTaxe(0, 0, 0)
  );

  useEffect(() => {
    try {
      StatsService.getTurnover(yearToDisplay)
        .then((values: TurnoverStats) => setTurnover(values))
        .catch((reason) => console.error(reason));

      StatsService.getMonthlyTurnover(yearToDisplay)
        .then((values: MonthlyTurnoverStats[]) => setMonthlyTurnover(values))
        .catch((reason) => console.error(reason));

      StatsService.getActiveCustomers(yearToDisplay)
        .then((value: number) => setActiveCustomers(value))
        .catch((reason) => console.error(reason));

      StatsService.getActiveCustomers(yearToDisplay - 1)
        .then((value: number) => setActiveCustomersLastYear(value))
        .catch((reason) => console.error(reason));

      StatsService.getNewCustomers(yearToDisplay)
        .then((value: number) => setNewCustomers(value))
        .catch((reason) => console.error(reason));

      StatsService.getNewCustomers(yearToDisplay - 1)
        .then((value: number) => setNewCustomersLastYear(value))
        .catch((reason) => console.error(reason));
    } catch {}
  }, [yearToDisplay]);
  useEffect(() => {
    try {
      /* Obtenir la taxe du mois encours */
      const month = new Date().getMonth();
      const year = new Date().getFullYear();

      StatsService.getTaxe(year, month)
        .then((value: CumulatedTaxe) => setTaxe(value))
        .catch((reason) => console.error(reason));

      StatsService.getTaxe(year - 1, month)
        .then((value: CumulatedTaxe) => setTaxeLastYear(value))
        .catch((reason) => console.error(reason));
    } catch {}
  }, [yearToDisplay]);

  const cumulatedTurnover = (
    monthlyTurnover: MonthlyTurnoverStats[] | undefined
  ) => {
    const real = new CumulatedTurnoverStats("real", []);
    const estimated = new CumulatedTurnoverStats("estimated", []);
    const previousYear = new CumulatedTurnoverStats("previousYear", []);

    let cumulatedReal = 0;
    let cumulatedEstimated = 0;
    let cumulatedPrevious = 0;

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    monthlyTurnover &&
      monthlyTurnover.forEach((value: MonthlyTurnoverStats) => {
        //only set real for months until now
        if (value.year < year || value.month <= month) {
          cumulatedReal += value.real;
          real.data.push(new Point(value.month, cumulatedReal));
        }
        cumulatedEstimated += value.estimated;
        estimated.data.push(new Point(value.month, cumulatedEstimated));
        cumulatedPrevious += value.previousYear;
        if (cumulatedPrevious > 0) {
          previousYear.data.push(new Point(value.month, cumulatedPrevious));
        }
      });

    return [real, estimated, previousYear];
  };

  return (
    <Box margin="0 20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={t("dashboardscreen.Title")}
          subtitle={t("dashboardscreen.Subtitle")}
        />

        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() => {
              setYearToDisplay(yearToDisplay - 1);
            }}
            disabled={yearToDisplay <= 2022}
            title={"" + (yearToDisplay - 1)}
          >
            <KeyboardArrowLeftOutlinedIcon />
          </IconButton>

          <Typography variant="h3">{yearToDisplay}</Typography>
          <IconButton
            onClick={() => {
              setYearToDisplay(yearToDisplay + 1);
            }}
            title={"" + (yearToDisplay + 1)}
          >
            <KeyboardArrowRightOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(18, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="1/3"
          gridRow="1"
          sx={{ backgroundColor: colors.primary[400] }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={"" + activeCustomers}
            subtitle={t("dashboardscreen.ActiveCustomers", {
              count: activeCustomers,
            })}
            progress={activeCustomers / activeCustomersLastYear}
            increase={
              activeCustomersLastYear > 0
                ? 100 * (activeCustomers / activeCustomersLastYear - 1)
                : undefined
            }
            icon={
              <ManageAccountsOutlinedIcon
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: "40px",
                }}
              />
            }
            comparisonRef={yearToDisplay - 1}
          />
        </Box>

        <Box
          gridColumn="3/6"
          gridRow="1"
          sx={{ backgroundColor: colors.primary[400] }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={"" + newCustomers}
            subtitle={t("dashboardscreen.NewCustomers", {
              count: newCustomers,
            })}
            progress={newCustomers / newCustomersLastYear}
            increase={
              newCustomersLastYear > 0
                ? 100 * (newCustomers / newCustomersLastYear - 1)
                : undefined
            }
            icon={
              <PersonAddAltOutlinedIcon
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: "40px",
                }}
              />
            }
            comparisonRef={yearToDisplay - 1}
          />
        </Box>

        <Box
          gridColumn="6/9"
          gridRow="1"
          sx={{ backgroundColor: colors.primary[400] }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={turnover.total?.toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
            unformattedTitle={turnover.total.toString()}
            subtitle={t("dashboardscreen.TotalTurnover")}
            progress={turnover.total / turnover.previousYearTotal}
            increase={
              turnover.previousYearTotal > 0
                ? 100 * (turnover.total / turnover.previousYearTotal - 1)
                : undefined
            }
            icon={
              <EuroOutlinedIcon
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: "40px",
                }}
              />
            }
            warningValue={32000}
            errorValue={36500}
            comparisonRef={yearToDisplay - 1}
          />
        </Box>

        <Box
          gridColumn="9/12"
          gridRow="1"
          sx={{ backgroundColor: colors.primary[400] }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={(
              turnover.total /
              (yearToDisplay === new Date().getFullYear()
                ? Math.round((12 * dayOfYear(new Date())) / 365)
                : 12)
            ).toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
            subtitle={t("dashboardscreen.AverageTurnover")}
            progress={
              (12 *
                (turnover.total /
                  (yearToDisplay === new Date().getFullYear()
                    ? Math.round((12 * dayOfYear(new Date())) / 365)
                    : 12))) /
              turnover.previousYearTotal
            }
            increase={
              turnover.previousYearTotal > 0
                ? 100 *
                  ((12 *
                    (turnover.total /
                      (yearToDisplay === new Date().getFullYear()
                        ? Math.round((12 * dayOfYear(new Date())) / 365)
                        : 12))) /
                    turnover.previousYearTotal -
                    1)
                : undefined
            }
            icon={
              <EuroOutlinedIcon
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: "40px",
                }}
              />
            }
            comparisonRef={yearToDisplay - 1}
          />
        </Box>

        <Box
          gridColumn="12/16"
          gridRow="1"
          sx={{ backgroundColor: colors.primary[400] }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={(
              turnover.net /
              (yearToDisplay === new Date().getFullYear()
                ? Math.round((12 * dayOfYear(new Date())) / 365)
                : 12)
            ).toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
            subtitle={t("dashboardscreen.AverageNet")}
            progress={
              (12 *
                (turnover.net /
                  (yearToDisplay === new Date().getFullYear()
                    ? Math.round((12 * dayOfYear(new Date())) / 365)
                    : 12))) /
              turnover.previousYearNet
            }
            increase={
              turnover.previousYearNet > 0
                ? 100 *
                  ((12 *
                    (turnover.net /
                      (yearToDisplay === new Date().getFullYear()
                        ? Math.round((12 * dayOfYear(new Date())) / 365)
                        : 12))) /
                    turnover.previousYearNet -
                    1)
                : undefined
            }
            icon={
              <EuroOutlinedIcon
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: "40px",
                }}
              />
            }
            comparisonRef={yearToDisplay - 1}
          />
        </Box>
        {/* l'affichage de TVA */}
        <Box
          gridColumn="16/19"
          gridRow="1"
          sx={{ backgroundColor: colors.primary[400] }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={taxe.total.toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
            subtitle={t("dashboardscreen.CumulatedTaxe")}
            icon={
              <EuroOutlinedIcon
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: "40px",
                }}
              />
            }
            comparisonRef={yearToDisplay}
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="1/10"
          gridRow="2/5"
          sx={{ backgroundColor: colors.primary[400] }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            color={theme.palette.secondary.main}
            sx={{ padding: "30px 30px 0 30px" }}
          >
            {t("dashboardscreen.monthlyTurnover")}
          </Typography>
          <Box height="400px" mt="-20px">
            <MonthlyTurnoverChart isDashboard={true} data={monthlyTurnover} />
          </Box>
        </Box>
        <Box
          gridColumn="10/19"
          gridRow="2/5"
          sx={{
            backgroundColor: colors.primary[400],
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            color={theme.palette.secondary.main}
            sx={{ padding: "30px 30px 0 30px" }}
          >
            {t("dashboardscreen.cumulatedTurnover")}
          </Typography>
          <Box height="400px" mt="-20px">
            <LineChart
              isDashboard={true}
              data={cumulatedTurnover(monthlyTurnover)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
