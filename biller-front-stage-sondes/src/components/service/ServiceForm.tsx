import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Header from "../global/Header";
import { useNavigate } from "react-router-dom";
import ServiceService from "../../services/ServiceService";
import { useTranslation } from "react-i18next";
import Service from "../../models/services/Service";

interface props {
  service: Service;
}

const ServiceForm = (param: props) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleBack = () => {
    navigate(`/services/`);
  };

  const validationSchema = yup.object().shape({
    designation: yup.string().required(t("common.required").toString()),
    price: yup.number().required(t("common.required").toString()),
    from: yup.date().required(t("common.required").toString()),
  });

  const formik = useFormik({
    initialValues: {
      id: param.service.id,
      designation: param.service.designation,
      price: param.service.price,
      from: param.service.from,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      ServiceService.saveService(values)
        .then(() => handleBack())
        .catch((reason) => console.error(reason));
    },
  });

  return (
    <Box m="0 20px">
      {formik.initialValues.id === undefined ? (
        <Header
          title={t("serviceForm.createTitle")}
          subtitle={t("serviceForm.createSubtitle")}
        />
      ) : (
        <Header
          title={t("serviceForm.editTitle")}
          subtitle={t("serviceForm.editSubtitle")}
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
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={t("serviceForm.Designation")}
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="designation"
            error={
              formik.touched.designation && Boolean(formik.errors.designation)
            }
            helperText={formik.touched.designation && formik.errors.designation}
            sx={{ gridColumn: "span 3" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type=""
            label={t("serviceForm.UPrice")}
            prefix="€"
            value={formik.values.price}
            onChange={formik.handleChange}
            name="price"
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            sx={{ gridColumn: "span 1", gridColumnStart: "1" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="date"
            InputLabelProps={{ shrink: true }}
            label={t("serviceForm.From")}
            value={formik.values.from}
            onChange={formik.handleChange}
            name="from"
            error={formik.touched.from && Boolean(formik.errors.from)}
            helperText={formik.touched.from && formik.errors.from}
            sx={{ gridColumn: "span 1", gridColumnStart: "1" }}
          />
        </Box>
        <Box display="flex" justifyContent="center" mt="20px">
          <Box pr="20px">
            <Button color="secondary" variant="outlined" onClick={handleBack}>
              {t("common.Cancel")}
            </Button>
          </Box>
          <Box>
            <Button type="submit" color="secondary" variant="contained">
              {formik.initialValues.id === undefined
                ? t("common.Create")
                : t("common.Update")}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ServiceForm;
