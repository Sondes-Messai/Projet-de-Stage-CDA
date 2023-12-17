import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { Box, Button, Tooltip, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/global/Header";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import CustomerService from "../../services/CustomerService";
import { useTranslation } from "react-i18next";
import DatagridStyle from "../../components/global/DatagridStyle";
import Customer from "../../models/Customers/Customer";

const Customers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    try {
      CustomerService.getCustomers()
        .then((values) => setCustomers(values))
        .catch((reason) => console.error(reason));
    } catch {}
  }, []);

  const editCustomer = React.useCallback(
    (id: number) => () => {
      navigate(`/customer/${id}`);
    },
    [navigate]
  );

  const addCustomer = () => {
    navigate(`/customer/`);
  };

  const columns = [
    {
      field: "id",
      headerName: t("customerScreen.ID"),
      renderCell: (params: GridRenderCellParams) => (
        <span>
          C{params.row.id.toString().padStart(5, "0")}
          <Tooltip
            arrow
            title={`${
              params.row.confidence === undefined
                ? ""
                : t("customerScreen.ConfidenceIndex", {
                    index: Math.min(
                      100,
                      Math.round(100 * params.row.confidence)
                    ),
                  })
            }`}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: theme.palette.primary.light,
                  "& .MuiTooltip-arrow": {
                    color: theme.palette.primary.light,
                  },
                  color: theme.palette.primary.contrastText,
                  fontSize: "0.8em",
                },
              },
            }}
            placement="bottom-start"
          >
            <span
              className="dot"
              style={{
                backgroundColor:
                  params.row.confidence === undefined
                    ? colors.grey[500]
                    : params.row.confidence > 0.8
                    ? colors.greenAccent[500]
                    : params.row.confidence > 0.4
                    ? colors.yellowAccent[500]
                    : colors.redAccent[500],
              }}
            ></span>
          </Tooltip>
        </span>
      ),
    },
    {
      field: "name",
      headerName: t("customerScreen.Name"),
      flex: 1,
    },
    {
      field: "address",
      headerName: t("customerScreen.Address"),
      flex: 1.5,
    },
    {
      field: "zip",
      headerName: t("customerScreen.ZipCode"),
      flex: 0.5,
    },
    {
      field: "town",
      headerName: t("customerScreen.Town"),
      flex: 1,
    },
    {
      field: "phone",
      headerName: t("customerScreen.Phone"),
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <span>
          <a href={"tel:" + params.row.phone} target="_blank" rel="noreferrer">
            {params.row.phone}
          </a>
        </span>
      ),
    },
    {
      field: "mobile",
      headerName: t("customerScreen.Cellular"),
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <span>
          <a href={"tel:" + params.row.mobile} target="_blank" rel="noreferrer">
            {params.row.mobile}
          </a>
        </span>
      ),
    },
    {
      field: "website",
      headerName: t("customerScreen.Website"),
      flex: 1.5,
      renderCell: (params: GridRenderCellParams) => (
        <span>
          <a href={params.row.website} target="_blank" rel="noreferrer">
            {params.row.website}
          </a>
        </span>
      ),
    },
    {
      field: "email",
      headerName: t("customerScreen.Email"),
      flex: 1.5,
      renderCell: (params: GridRenderCellParams) => (
        <span>
          <a
            href={"mailto:" + params.row.email}
            target="_blank"
            rel="noreferrer"
          >
            {params.row.email}
          </a>
        </span>
      ),
    },
    {
      field: "billed",
      headerName: t("customerScreen.Billed"),
      flex: 1,
      type: "number",
      renderCell: (params: GridRenderCellParams) => (
        <span>
          {params.row.billed
            ? params.row.billed.toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            : "-"}{" "}
          €
        </span>
      ),
    },
    {
      field: "paid",
      headerName: t("customerScreen.Paid"),
      flex: 1,
      type: "number",
      renderCell: (params: GridRenderCellParams) => (
        <span>
          {params.row.paid
            ? params.row.paid.toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            : "-"}{" "}
          €
        </span>
      ),
    },
    {
      field: "due",
      headerName: t("customerScreen.Due"),
      flex: 1,
      type: "number",
      renderCell: (params: GridRenderCellParams) => (
        <span>
          {params.row.billed
            ? (params.row.billed - params.row.paid).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            : "-"}{" "}
          €
        </span>
      ),
    },
    {
      field: "actions",
      type: "actions",
      flex: 0.01,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<EditOutlinedIcon />}
          label={t("customerScreen.Edit")}
          onClick={editCustomer(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <Box margin="0 20px">
      <Header
        title={t("customerScreen.Title")}
        subtitle={t("customerScreen.Subtitle")}
      />
      <Box display="flex" justifyContent="end" mt="-63px">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={addCustomer}
        >
          {t("customerScreen.CreateNewCustomer")}
        </Button>
      </Box>
      <Box m="40px 0 0 0" height="72.5vh" sx={DatagridStyle}>
        <DataGrid
          rows={customers}
          columns={columns}
          density="comfortable"
          pageSize={10}
          autoHeight={true}
          headerHeight={40}
        />
      </Box>
    </Box>
  );
};

export default Customers;
