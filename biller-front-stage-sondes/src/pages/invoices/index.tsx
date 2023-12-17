import { Box, Button, ButtonBase, Tooltip, useTheme } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridCellParams,
  GridColumns,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import Header from "../../components/global/Header";
import { useNavigate } from "react-router-dom";
import InvoiceService from "../../services/InvoiceService";

import React, { useCallback, useEffect, useState } from "react";
import PaymentModal from "../../components/invoice/PaymentModal";
import { useTranslation } from "react-i18next";

import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import DatagridStyle from "../../components/global/DatagridStyle";
import Invoice from "../../models/invoices/Invoice";

import clsx from "clsx";
import PublishModal from "../../components/invoice/PublishModal";
import UnpaidModal from "../../components/invoice/UnpaidModal";
import DeleteModal from "../../components/invoice/DeleteModal";

const Invoices = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [invoiceToPay, setInvoiceToPay] = useState<number | null>(null);

  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);
  const [invoiceToPublish, setInvoiceToPublish] = useState<Invoice>();

  const [showUnpaidModal, setShowUnpaidModal] = useState<boolean>(false);
  const [invoiceToUnpaid, setInvoiceToUnpaid] = useState<Invoice>();

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<Invoice>();

  const [showNextInvoices, setShowNextInvoices] = useState<boolean>(
    localStorage.getItem("showNextInvoices") === "true"
  );

  useEffect(() => {
    try {
      let now = new Date();
      now.setDate(now.getDate() + 30);
      //alert(new Date("2024-10-23") < now);
      InvoiceService.getInvoices()
        .then((values: Invoice[]) =>
          setInvoices(
            values.filter(
              (invoice: Invoice) =>
                showNextInvoices ||
                invoice.dueOn === undefined ||
                new Date(invoice.dueOn) < now
            )
          )
        )
        .catch((reason) => console.error(reason));
    } catch {}
  }, [showNextInvoices]);

  const navigate = useNavigate();

  const showHideInvoice = () => {
    localStorage.setItem(
      "showNextInvoices",
      !showNextInvoices ? "true" : "false"
    );

    setShowNextInvoices(!showNextInvoices);
  };

  const addInvoice = () => {
    navigate(`/invoice/`);
  };

  const updateInvoiceList = useCallback(
    (invoice: Invoice) => {
      let newArray = invoices.filter((item) => {
        return item.id !== invoice.id;
      });
      newArray.push(invoice);
      setInvoices(newArray);
    },
    [invoices]
  );

  const updateInvoiceListDelete = useCallback(
    (invoice: Invoice) => {
      let newArray = invoices.filter((item) => {
        return item.id !== invoice.id;
      });
      setInvoices(newArray);
    },
    [invoices]
  );
  const editInvoice = useCallback(
    (id: number, copy: boolean) => () => {
      navigate(`/invoice/${id}/${copy}`);
    },
    [navigate]
  );

  const printInvoice = useCallback(
    (id: number) => () => {
      InvoiceService.printInvoice(id);
    },
    []
  );

  const payInvoice = (id: number) => () => {
    setShowPaymentModal(true);
    setInvoiceToPay(id);
  };

  const deleteInvoice = (id: number) => () => {
    let invoice = invoices.find((elm) => elm.id === id);
    console.log(invoice);
    setInvoiceToDelete(invoice);
    setShowDeleteModal(true);
  };

  const publishInvoice = (id: number) => () => {
    let invoice = invoices.find((elm) => elm.id === id);
    setInvoiceToPublish(invoice);
    setShowPublishModal(true);
  };

  const unpaidInvoice = (id: number) => () => {
    let invoice = invoices.find((elm) => elm.id === id);
    setInvoiceToUnpaid(invoice);
    setShowUnpaidModal(true);
  };

  const columns: GridColumns<Invoice> = [
    {
      field: " ",
      align: "center",
      width: 40,
      renderCell: (params: GridRenderCellParams) =>
        params.row.emittedOn === undefined ? (
          <Tooltip
            title={t("invoiceScreen.draft")}
            arrow
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
            <ModeEditOutlineOutlinedIcon className="draft" />
          </Tooltip>
        ) : params.row.paidOn !== undefined ? (
          <Tooltip
            title={t("invoiceScreen.paid")}
            arrow
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
            <PaymentsOutlinedIcon className="success" />
          </Tooltip>
        ) : new Date(params.row.dueOn) < new Date() ? (
          <Tooltip
            title={t("invoiceScreen.latePayment")}
            arrow
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
            <LocalFireDepartmentRoundedIcon className="error" />
          </Tooltip>
        ) : (
          <Tooltip
            title={t("invoice.waitingPayment")}
            arrow
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
            <TimerOutlinedIcon className="info" />
          </Tooltip>
        ),
    },
    {
      field: "invoiceRef",
      flex: 0.5,
      headerName: t("invoiceScreen.Invoice").toString(),
    },
    {
      field: "customer.id",
      headerName: t("invoiceScreen.Customer").toString(),
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <span>
          C{params.row.customer.id.toString().padStart(5, "0")}&nbsp;-&nbsp;
          {params.row.customer.name}
        </span>
      ),
    },
    {
      field: "purchaseOrder",
      flex: 0.5,
      headerName: t("invoiceScreen.PurchaseOrder").toString(),
    },
    {
      field: "taxe",
      headerName: t("invoiceScreen.Taxes").toString(),
      type: "boolean",
      flex: 0.1,
      cellClassName: (params: GridCellParams<boolean>) =>
        clsx("", { success: params.value, error: !params.value }),
    },
    {
      field: "amount",
      headerName: t("invoiceScreen.Total").toString(),
      type: "number",
      flex: 0.5,
      renderCell: (params: GridRenderCellParams) => (
        <span>
          {params.row.amount.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}{" "}
          €
        </span>
      ),
    },

    {
      field: "emittedOn",
      headerName: t("invoiceScreen.EmittedOn").toString(),
      type: "date",
      flex: 0.5,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "dueOn",
      headerName: t("invoiceScreen.DueOn").toString(),
      type: "date",
      flex: 0.5,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "paidOn",
      headerName: t("invoiceScreen.PaidOn").toString(),
      type: "date",
      flex: 0.5,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "actions",
      type: "actions",
      flex: 0.1,
      getActions: (params: GridRowParams) => [
        params.row.invoiceRef === undefined ? (
          <GridActionsCellItem
            icon={<EditOutlinedIcon />}
            label={t("invoiceScreen.Edit")}
            onClick={editInvoice(params.row.id, false)}
            showInMenu
            disabled={params.row.invoiceRef !== undefined}
          />
        ) : (
          <GridActionsCellItem
            icon={<VisibilityOutlinedIcon />}
            label={t("invoiceScreen.Show")}
            onClick={editInvoice(params.row.id, false)}
            showInMenu
            disabled={params.row.invoiceRef === undefined}
            aria-hidden={params.row.invoiceRef === undefined}
          />
        ),
        <GridActionsCellItem
          icon={<ContentCopyOutlinedIcon />}
          label={t("invoiceScreen.Copy")}
          onClick={editInvoice(params.row.id, true)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<PrintOutlinedIcon />}
          label={t("invoiceScreen.Print")}
          onClick={printInvoice(params.row.id)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<PublishOutlinedIcon />}
          label={t("invoiceScreen.Publish")}
          onClick={publishInvoice(params.row.id)}
          showInMenu
          disabled={params.row.invoiceRef !== undefined}
        />,
        <GridActionsCellItem
          icon={<PaymentsOutlinedIcon />}
          label={t("invoiceScreen.Pay")}
          onClick={payInvoice(params.row.id)}
          showInMenu
          disabled={
            params.row.invoiceRef === undefined ||
            params.row.paidOn !== undefined
          }
        />,
        <GridActionsCellItem
          icon={<PaymentsOutlinedIcon />}
          label={t("invoiceScreen.Unpaid")}
          onClick={unpaidInvoice(params.row.id)}
          showInMenu
          disabled={
            params.row.invoiceRef !== undefined &&
            params.row.paidOn === undefined
          }
        />,
        <GridActionsCellItem
          icon={<DeleteOutlinedIcon />}
          label={t("invoiceScreen.Delete")}
          onClick={deleteInvoice(params.row.id)}
          showInMenu
          disabled={params.row.emittedOn !== undefined}
        />,
      ],
    },
  ];

  return (
    <Box margin="0 20px">
      <Header
        title={t("invoiceScreen.Title")}
        subtitle={t("invoiceScreen.Subtitle")}
      />
      <Box display="flex" justifyContent="end" mt="-63px">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={addInvoice}
        >
          {t("invoiceScreen.CreateNewInvoice")}
        </Button>
      </Box>
      <Box display="flex" justifyContent="end" mt="15px" mb="-40px">
        <ButtonBase onClick={showHideInvoice}>
          {showNextInvoices ? (
            <>
              <Box marginRight="5px">{t("invoiceScreen.HideNextInvoices")}</Box>

              <VisibilityOffOutlinedIcon />
            </>
          ) : (
            <>
              <Box marginRight="5px">{t("invoiceScreen.ShowNextInvoices")}</Box>

              <VisibilityOutlinedIcon />
            </>
          )}
        </ButtonBase>
      </Box>
      <Box m="40px 0 0 0" height="53em" sx={DatagridStyle}>
        <DataGrid
          rows={invoices}
          columns={columns}
          density="comfortable"
          pageSize={10}
          initialState={{
            sorting: {
              sortModel: [{ field: "dueOn", sort: "desc" }],
            },
          }}
          autoHeight={true}
          headerHeight={40}
        />
      </Box>
      <PaymentModal
        show={showPaymentModal}
        invoice={invoiceToPay}
        setShowModal={setShowPaymentModal}
        updateInvoiceList={updateInvoiceList}
      />
      <PublishModal
        show={showPublishModal}
        invoice={invoiceToPublish}
        setShowModal={setShowPublishModal}
        updateInvoiceList={updateInvoiceList}
      />
      <UnpaidModal
        show={showUnpaidModal}
        invoice={invoiceToUnpaid}
        setShowModal={setShowUnpaidModal}
        updateInvoiceList={updateInvoiceList}
      />
      <DeleteModal
        show={showDeleteModal}
        invoice={invoiceToDelete}
        setShowModal={setShowDeleteModal}
        updateInvoiceList={updateInvoiceListDelete}
      />
    </Box>
  );
};

export default Invoices;
