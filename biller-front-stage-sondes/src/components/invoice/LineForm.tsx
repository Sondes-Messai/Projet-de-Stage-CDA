import React from "react";
import {
  IconButton,
  MenuItem,
  TextField,
  TableRow,
  TableCell,
} from "@mui/material";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Service from "../../models/services/Service";

const LineForm = (props: any) => {
  const {
    formik,
    detail,
    index,
    services,
    calculateRowTotal,
    handleDeleteLine,
  } = props;

  return (
    <TableRow
      className="row"
      key={index}
      sx={{
        gap: "5px",
        gridColumn: "span 4",
        "& > div": {
          gridColumn: "span 4",
        },
      }}
    >
      <TableCell>
        <TextField
          fullWidth
          select
          variant="filled"
          type="text"
          value={detail.id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.initialValues.invoiceRef !== undefined}
          name={`details[${index}].id`}
          error={
            formik.touched.details &&
            formik.touched.details[index] &&
            formik.errors.details &&
            formik.errors.details[index] &&
            formik.errors.details[index].id
          }
        >
          {services.map(
            (service: Service) =>
              service.id && (
                <MenuItem key={service.id} value={service.id}>
                  P{service.id.toString().padStart(4, "0")}
                  &nbsp;-&nbsp;
                  {service.designation}
                </MenuItem>
              )
          )}
        </TextField>
      </TableCell>
      <TableCell sx={{ width: "35%" }}>
        <TextField
          fullWidth
          variant="filled"
          type="text"
          value={detail.label}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.initialValues.invoiceRef !== undefined}
          name={`details[${index}].label`}
        />
      </TableCell>
      <TableCell sx={{ width: "10%" }}>
        <TextField
          fullWidth
          variant="filled"
          type="text"
          color="primary"
          inputProps={{
            readOnly: true,
            style: { textAlign: "right" },
          }}
          value={
            (detail.id !== undefined
              ? services.find((service: Service) => service.id === detail.id)
                  .price
              : 0
            ).toFixed(2) + " €"
          }
        />
      </TableCell>
      <TableCell sx={{ width: "10%" }}>
        <TextField
          fullWidth
          variant="filled"
          type="text"
          inputProps={{ min: 0, style: { textAlign: "right" } }}
          value={detail.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.initialValues.invoiceRef !== undefined}
          name={`details[${index}].quantity`}
          error={
            formik.touched.details &&
            formik.touched.details[index] &&
            formik.errors.details &&
            formik.errors.details[index] &&
            formik.errors.details[index].quantity
          }
        />
      </TableCell>
      <TableCell sx={{ width: "10%" }}>
        <TextField
          fullWidth
          variant="filled"
          type="text"
          inputProps={{ min: 0, style: { textAlign: "right" } }}
          value={detail.discount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.initialValues.invoiceRef !== undefined}
          name={`details[${index}].discount`}
          error={
            formik.touched.details &&
            formik.touched.details[index] &&
            formik.errors.details &&
            formik.errors.details[index] &&
            formik.errors.details[index].discount
          }
        />
      </TableCell>
      <TableCell sx={{ width: "10%" }}>
        <TextField
          fullWidth
          variant="filled"
          type="text"
          inputProps={{
            readOnly: true,
            style: { textAlign: "right" },
          }}
          value={`${calculateRowTotal(
            detail.quantity,
            detail.id,
            detail.discount
          )} €`}
        />
      </TableCell>
      <TableCell sx={{ width: "10%" }}>
        {formik.values.details.length > 1 ? (
          <IconButton onClick={(e) => handleDeleteLine(index, e)}>
            <DeleteOutlinedIcon color="secondary" />
          </IconButton>
        ) : (
          ""
        )}
      </TableCell>
    </TableRow>
  );
};

export default LineForm;
