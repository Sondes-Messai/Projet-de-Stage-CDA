import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/global/Header";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ServiceService from "../../services/ServiceService";
import { useTranslation } from "react-i18next";
import DatagridStyle from "../../components/global/DatagridStyle";
import Service from "../../models/services/Service";

const Items = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    try {
      ServiceService.getServices()
        .then((values) => setServices(values))
        .catch((reason) => console.error(reason));
    } catch {}
  }, []);

  const updateServiceList = useCallback(
    (service: Service) => {
      let newArray = services.filter((item) => {
        return item.id !== service.id;
      });
      newArray.push(service);
      setServices(newArray);
    },
    [services]
  );

  const editService = useCallback(
    (id: number | undefined) => () => {
      navigate(`/service/${id}`);
    },
    [navigate]
  );

  const addService = () => {
    navigate(`/service/`);
  };

  const lockService = useCallback(
    (id: number | undefined) => () => {
      id &&
        ServiceService.lock(id)
          .then((service) => updateServiceList(service))
          .catch((reason) => console.error(reason));
    },
    [updateServiceList]
  );

  const unlockService = useCallback(
    (id: number | undefined) => () => {
      id &&
        ServiceService.unlock(id)
          .then((service) => updateServiceList(service))
          .catch((reason) => console.error(reason));
    },
    [updateServiceList]
  );

  const columns: GridColumns<Service> = [
    {
      field: "id",
      headerName: t("serviceScreen.ID").toString(),
      renderCell: (params: GridRenderCellParams) => (
        <span>P{params.row.id.toString().padStart(4, "0")}</span>
      ),
    },
    {
      field: "designation",
      headerName: t("serviceScreen.Designation").toString(),
      flex: 1,
    },
    {
      field: "price",
      headerName: t("serviceScreen.UPrice").toString(),
      type: "number",
      renderCell: (params: GridRenderCellParams) => (
        <span>
          {params.row.price.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}{" "}
          €
        </span>
      ),
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditOutlinedIcon />}
          label={t("serviceScreen.Edit")}
          onClick={editService(params.row.id)}
        />,
        params.row.to !== undefined ? (
          <GridActionsCellItem
            icon={
              <LockOutlinedIcon
                sx={{ color: `${colors.redAccent[500]} !important` }}
              />
            }
            label={t("serviceScreen.Unlock")}
            onClick={unlockService(params.row.id)}
          />
        ) : (
          <GridActionsCellItem
            icon={
              <LockOpenOutlinedIcon
                sx={{ color: `${colors.greenAccent[500]} !important` }}
              />
            }
            label={t("serviceScreen.Lock")}
            onClick={lockService(params.row.id)}
          />
        ),
      ],
    },
  ];

  return (
    <Box m="0 20px">
      <Header
        title={t("serviceScreen.Title")}
        subtitle={t("serviceScreen.Subtitle")}
      />
      <Box display="flex" justifyContent="end" mt="-63px">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={addService}
        >
          {t("serviceScreen.CreateNewService")}
        </Button>
      </Box>
      <Box m="40px 0 0 0" height="72.5vh" sx={DatagridStyle}>
        <DataGrid
          rows={services}
          columns={columns}
          density="comfortable"
          pageSize={10}
          initialState={{
            sorting: {
              sortModel: [{ field: "id", sort: "asc" }],
            },
          }}
          autoHeight={true}
          headerHeight={40}
        />
      </Box>
    </Box>
  );
};

export default Items;
