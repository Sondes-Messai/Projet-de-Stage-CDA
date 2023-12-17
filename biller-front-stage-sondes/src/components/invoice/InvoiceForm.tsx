import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  useTheme,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Header from "../global/Header";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InvoiceDetail from "../../models/invoices/InvoiceDetail";
import LineForm from "./LineForm";
import InvoiceService from "../../services/InvoiceService";
import { useTranslation } from "react-i18next";
import Service from "../../models/services/Service";
import Customer from "../../models/Customers/Customer";

const InvoiceForm = (param: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [invoiceTotalFeesIncluded, setInvoiceTotalFeesIncluded] = useState(0);

  const handleBack = () => {
    navigate(`/invoices/`);
  };

  const calculateRowTotal = (
    quantity: number,
    serviceId: number,
    discount: number
  ) => {
    const total =
      (quantity ? quantity : 0) *
      (serviceId !== undefined
        ? param.services.find((service: Service) => service.id === serviceId)
            .price
        : 0) *
      (discount !== undefined ? (100 - discount) / 100 : 1);

    //should update total ?
    updateInvoiceTotal();

    return total.toFixed(2);
  };

  const updateInvoiceTotal = () => {
    let total = 0;

    // eslint-disable-next-line array-callback-return
    formik.values.details.map((detail: InvoiceDetail) => {
      total +=
        detail.quantity !== undefined
          ? detail.quantity *
            (detail.id !== undefined
              ? param.services.find(
                  (service: Service) => service.id === detail.id
                ).price
              : 0) *
            (detail.discount !== undefined ? (100 - detail.discount) / 100 : 1)
          : 0;
    });

    setInvoiceTotal(total);
    setInvoiceTotalFeesIncluded(invoiceTotal * (formik.values.taxe ? 1.2 : 1));
  };

  const handleNewLine = (e: React.MouseEvent) => {
    if (e !== undefined) e.preventDefault();
    const lines =
      formik.values.details !== undefined ? formik.values.details : [];
    let newLine: InvoiceDetail = new InvoiceDetail();
    newLine.discount = 0;
    lines.push(newLine);
    formik.setFieldValue("details", lines);
  };

  const handleDeleteLine = (index: number, e: React.ChangeEvent) => {
    e.preventDefault();
    const lines = formik.values.details;
    lines.splice(index, 1);
    formik.setFieldValue("details", lines);
  };

  const validationSchema = yup.object().shape({
    customer: yup.number().required(t("common.required").toString()),
    details: yup
      .array()
      .min(1, t("common.required").toString())
      .of(
        yup.object().shape({
          id: yup.number().required(t("common.required").toString()),
          quantity: yup
            .number()
            .moreThan(0, t("common.moreThan0").toString())
            .required(t("common.required").toString()),
          discount: yup
            .number()
            .min(0)
            .lessThan(100, t("common.lessThan100%").toString())
            .required(),
        })
      )
      .required(t("common.required").toString()),
  });

  const formik = useFormik({
    initialValues: {
      id: param.invoice.id,
      invoiceRef: param.invoice.invoiceRef,
      customer: param.invoice.customer?.id,
      purchaseOrder: param.invoice.purchaseOrder,
      amount: param.invoice.amount,
      emittedOn: param.invoice.emittedOn,
      dueOn: param.invoice.dueOn,
      paidOn: param.invoice.paidOn,
      paymentMethod: param.invoice.paymentMethod,
      taxe: param.invoice.taxe,
      details: param.invoice.details,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formValues = {
        ...formik.values,
        ...{
          customer: {
            id: formik.values.customer,
            name: "",
            address: "",
            zip: "",
            town: "",
            phone: "",
            website: "",
            email: "",
          },
        },
        ...{ amount: invoiceTotalFeesIncluded },
      };
      InvoiceService.saveInvoice(formValues)
        .then(() => handleBack())
        .catch((reason) => console.error(reason));
    },
  });

  return (
    <Box m="0 20px">
      {formik.initialValues.id === undefined ? (
        <Header
          title={t("invoiceForm.CreateTitle")}
          subtitle={t("invoiceForm.CreateSubtitle")}
        />
      ) : formik.initialValues.invoiceRef !== undefined ? (
        <Header
          title={t("invoiceForm.ShowTitle", {
            ref: formik.initialValues.invoiceRef,
          })}
          subtitle=""
        />
      ) : (
        <Header
          title={t("invoiceForm.EditTitle")}
          subtitle={t("invoiceForm.EditSubtitle")}
        />
      )}

      <form onSubmit={formik.handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": "span 4",
          }}
        >
          {/*ROW 1 */}
          <TextField
            fullWidth
            select
            variant="filled"
            type="text"
            label={t("invoiceForm.Customer")}
            value={formik.values.customer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.initialValues.invoiceRef !== undefined}
            name="customer"
            error={formik.touched.customer && Boolean(formik.errors.customer)}
            helperText={
              formik.touched.customer && formik.errors.customer?.toString()
            }
            sx={{ gridColumn: "span 2" }}
          >
            {param.customers.map(
              (cust: Customer) =>
                cust.id && (
                  <MenuItem key={cust.id} value={cust.id}>
                    C{cust.id.toString().padStart(5, "0")}&nbsp;-&nbsp;
                    {cust.name}
                  </MenuItem>
                )
            )}
          </TextField>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={t("invoiceForm.PurchaseOrder")}
            value={formik.values.purchaseOrder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.initialValues.invoiceRef !== undefined}
            name="purchaseOrder"
            error={
              formik.touched.purchaseOrder &&
              Boolean(formik.errors.purchaseOrder)
            }
            helperText={
              formik.touched.purchaseOrder &&
              formik.errors.purchaseOrder?.toString()
            }
            sx={{ gridColumn: "span 1" }}
          />
          {/*ROW 2 */}
          <TextField
            fullWidth
            variant="filled"
            type="date"
            InputLabelProps={{ shrink: true }}
            label={t("invoiceForm.EmittedOn")}
            value={formik.values.emittedOn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.initialValues.invoiceRef !== undefined}
            name="emittedOn"
            error={formik.touched.emittedOn && Boolean(formik.errors.emittedOn)}
            helperText={
              formik.touched.emittedOn && formik.errors.emittedOn?.toString()
            }
            sx={{ gridColumn: "span 1", gridColumnStart: "1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="date"
            InputLabelProps={{ shrink: true }}
            label={t("invoiceForm.DueOn")}
            value={formik.values.dueOn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.initialValues.invoiceRef !== undefined}
            name="dueOn"
            error={formik.touched.dueOn && Boolean(formik.errors.dueOn)}
            helperText={formik.touched.dueOn && formik.errors.dueOn?.toString()}
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="date"
            InputLabelProps={{ shrink: true }}
            label={t("invoiceForm.PaidOn")}
            value={formik.values.paidOn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.initialValues.invoiceRef !== undefined}
            name="paidOn"
            error={formik.touched.paidOn && Boolean(formik.errors.paidOn)}
            helperText={
              formik.touched.paidOn && formik.errors.paidOn?.toString()
            }
            sx={{ gridColumn: "span 1" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={formik.values.taxe}
                checked={formik.values.taxe}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.initialValues.invoiceRef !== undefined}
                name="taxe"
                sx={{
                  //color: colors.secondary,
                  "&.Mui-checked": {
                    color: theme.palette.secondary.main,
                  },
                }}
              />
            }
            label={t("invoiceForm.Taxes")}
          />

          {/*ROW 3 = Details*/}
          <Box sx={{ gridColumn: "span 4" }} mt="20px">
            <Typography
              variant="h5"
              fontWeight="600"
              color={
                formik.errors.details
                  ? colors.redAccent[500]
                  : theme.palette.secondary.main
              }
            >
              {t("invoiceForm.InvoiceDetails")}
            </Typography>

            <Table
              stickyHeader
              sx={{
                gridColumn: "span 4",
              }}
              padding="none"
            >
              <TableHead>
                <TableRow>
                  <TableCell width="20%">{t("invoiceForm.Service")}</TableCell>
                  <TableCell width="25%">{t("invoiceForm.Label")}</TableCell>
                  <TableCell width="8%">{t("invoiceForm.Uprice")}</TableCell>
                  <TableCell width="5%">{t("invoiceForm.Quantity")}</TableCell>
                  <TableCell width="8%">{t("invoiceForm.Discount")}</TableCell>
                  <TableCell>{t("invoiceForm.TotalWoTaxes")}</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {formik.values.details !== undefined &&
                  formik.values.details.map(
                    (detail: InvoiceDetail, index: number) => (
                      <LineForm
                        formik={formik}
                        detail={detail}
                        index={index}
                        services={param.services}
                        calculateRowTotal={calculateRowTotal}
                        handleDeleteLine={handleDeleteLine}
                      />
                    )
                  )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={theme.palette.secondary.main}
                      sx={{ marginRight: "10px" }}
                    >
                      {t("invoiceForm.TotalWoTaxes")}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "right" },
                      }}
                      value={`${invoiceTotal.toFixed(2)} €`}
                    />
                  </TableCell>
                  <TableCell>
                    {formik.initialValues.invoiceRef === undefined && (
                      <IconButton
                        sx={{ gridColumnStart: 17 }}
                        onClick={(e) => handleNewLine(e)}
                        disabled={formik.initialValues.invoiceRef !== undefined}
                      >
                        <AddOutlinedIcon color="secondary" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={theme.palette.secondary.main}
                      sx={{ marginRight: "10px" }}
                    >
                      {t("invoiceForm.TotalWTaxes")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "right" },
                      }}
                      value={`${invoiceTotalFeesIncluded.toFixed(2)} €`}
                      name="amount"
                    />
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" mt="20px">
          <Box pr="20px">
            <Button color="secondary" variant="outlined" onClick={handleBack}>
              {t("common.Cancel")}
            </Button>
          </Box>
          <Box>
            {formik.initialValues.invoiceRef === undefined && (
              <Button type="submit" color="secondary" variant="contained">
                {formik.initialValues.id === undefined
                  ? t("common.Create")
                  : t("common.Update")}
              </Button>
            )}
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default InvoiceForm;
