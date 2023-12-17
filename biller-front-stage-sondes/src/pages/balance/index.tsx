import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
  GridRowModel,
  GridRowParams,
} from "@mui/x-data-grid";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/global/Header";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import BalanceService from "../../services/BalanceService";
import { useTranslation } from "react-i18next";
import MonthlyIncomeOutcome from "../../components/graphics/MonthlyIncomeOutcome";
import MonthlyIncomesOutcomes from "../../models/statistics/MonthlyIncomesOutcomes";

import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DatagridStyle from "../../components/global/DatagridStyle";
import Movement from "../../models/Balance/Movement";
import { ElectricCarOutlined } from "@mui/icons-material";

const Balance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [movements, setMovements] = useState<Movement[]>([]);
  const [monthlyIncomeOutcome, setMonthlyIncomeOutcome] = useState<
    MonthlyIncomesOutcomes[]
  >([]);

  useEffect(() => {
    try {
      BalanceService.getMovements()
        .then((values) => setMovements(values))
        .catch((reason) => console.error(reason));
    } catch {}
  }, []);

  useEffect(() => {
    let data: MonthlyIncomesOutcomes[] = [];
    movements.forEach((mvt) => {
      const year = new Date(mvt.date).getFullYear();
      const month = new Date(mvt.date).getMonth() + 1;
      let known = data.find(
        (value) => value.year === year && value.month === month
      );
      if (known === undefined)
        known = new MonthlyIncomesOutcomes(year, month, 0, 0);
      if (mvt.amount !== undefined)
        if (mvt.amount < 0) {
          known.outcomes += mvt.amount;
        } else {
          known.incomes += mvt.amount;
        }
      data = data.filter((value) => value.month !== month);
      data.push(known);
    });

    setMonthlyIncomeOutcome(data.slice(-12));
  }, [movements]);

  const editMovement = React.useCallback(
    (id: number) => () => {
      navigate(`/movement/${id}`);
    },
    [navigate]
  );

  const deleteMovement = React.useCallback(
    (id: number) => async () => {
      if (await BalanceService.deleteMovement(id)) {
        setMovements(movements.filter((mvt) => mvt.id !== id));
      }
    },
    [movements]
  );

  const addMovement = () => {
    navigate(`/movement/`);
  };

  const GasRegExp = /(E|e)ssence/;

  const InvoiceRegExp = /F20[0-9]{6}/;

  const UrssafRegExp = /URSSAF/;

  const ElecticityRegExp = /Recharge Tesla/;

  const icon = (row: GridRowModel) => {
    if (GasRegExp.test(row.description))
      return (
        <LocalGasStationOutlinedIcon
          sx={{
            color: colors.grey[400],
            verticalAlign: "middle",
            marginLeft: "10px",
          }}
        />
      );
    if (InvoiceRegExp.test(row.description))
      return (
        <SchoolOutlinedIcon
          sx={{
            color: colors.grey[400],
            verticalAlign: "middle",
            marginLeft: "10px",
          }}
        />
      );
    if (UrssafRegExp.test(row.thirdParty))
      return (
        <AccountBalanceOutlinedIcon
          sx={{
            color: colors.grey[400],
            verticalAlign: "middle",
            marginLeft: "10px",
          }}
        />
      );
    if (ElecticityRegExp.test(row.description))
      return (
        <ElectricCarOutlined
          sx={{
            color: colors.grey[400],
            verticalAlign: "middle",
            marginLeft: "10px",
          }}
        />
      );
    return;
  };

  const columns: GridColumns<Movement> = [
    {
      field: "date",
      headerName: t("balanceScreen.Date").toString(),
      flex: 0.5,
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
      cellClassName: (params) =>
        new Date(params.row.date) > new Date() ? "future" : "actual",
    },
    {
      field: "thirdParty",
      headerName: t("balanceScreen.ThirdParty").toString(),
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {icon(params.row)}
          &nbsp;&nbsp;
          {params.row.thirdParty}
        </>
      ),
      cellClassName: (params) =>
        new Date(params.row.date) > new Date() ? "future" : "actual",
    },
    {
      field: "description",
      headerName: t("balanceScreen.Description").toString(),
      flex: 1,
      cellClassName: (params) =>
        new Date(params.row.date) > new Date() ? "future" : "actual",
    },
    {
      field: "  ",
      headerName: t("balanceScreen.Amount").toString(),
      flex: 0.5,
      type: "number",
      renderCell: (params: GridRenderCellParams) => (
        <span
          style={{
            fontWeight: "bold",
            color:
              params.row.amount > 0
                ? colors.greenAccent[500]
                : colors.redAccent[500],
          }}
        >
          {params.row.amount.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}{" "}
          €
        </span>
      ),
      cellClassName: (params) =>
        new Date(params.row.date) > new Date() ? "future" : "actual",
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<EditOutlinedIcon />}
          label={t("balanceScreen.Edit")}
          onClick={editMovement(params.row.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteOutlinedIcon />}
          label={t("balanceScreen.Delete")}
          onClick={deleteMovement(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <Box margin="0 20px">
      <Header
        title={t("balanceScreen.Title")}
        subtitle={t("balanceScreen.Subtitle")}
      />
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box>
          <Box display="flex" justifyContent="end" mt="-63px">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={addMovement}
            >
              {t("balanceScreen.CreateNewMovement")}
            </Button>
          </Box>
          <Box m="40px 0 0 0" height="52em" sx={DatagridStyle}>
            <DataGrid
              rows={movements}
              columns={columns}
              density="comfortable"
              pageSize={10}
              initialState={{
                sorting: {
                  sortModel: [{ field: "date", sort: "desc" }],
                },
              }}
              autoHeight={true}
              sx={{ minWidth: "670px" }}
              headerHeight={40}
            />
          </Box>
        </Box>
        <Box display="grid" gridAutoRows="150px" gap="20px" mt={"12px"}>
          <Box height={"48.5em"} sx={{ backgroundColor: colors.primary[400] }}>
            <Typography
              variant="h5"
              fontWeight="600"
              color={theme.palette.secondary.main}
              sx={{ padding: "30px 30px 0 30px" }}
            >
              {t("balanceScreen.monthlyIncomeOutcome", {
                year: new Date().getFullYear(),
              })}
            </Typography>
            <Box height="45em" mt="-20px">
              <MonthlyIncomeOutcome
                data={monthlyIncomeOutcome}
                isDashboard={true}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Balance;
