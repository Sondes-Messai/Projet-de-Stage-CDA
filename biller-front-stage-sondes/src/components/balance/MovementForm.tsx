import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Header from "../global/Header";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BalanceService from "../../services/BalanceService";
import Movement from "../../models/Balance/Movement";

interface props {
  movement: Movement;
}

const MovementForm = (param: props) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleBack = () => {
    navigate(`/balance/`);
  };

  const validationSchema = yup.object().shape({
    thirdParty: yup.string().required(t("common.required").toString()),
    date: yup.date().required(t("common.required").toString()),
    amount: yup.number().required(t("common.required").toString()),
  });

  const formik = useFormik({
    initialValues: {
      id: param.movement.id,
      date: param.movement.date,
      thirdParty: param.movement.thirdParty,
      description: param.movement.description,
      amount: param.movement.amount,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      BalanceService.saveMovement(values)
        .then(() => handleBack())
        .catch((reason) => console.error(reason));
    },
  });

  return (
    <Box m="0 20px">
      {formik.initialValues.id === undefined ? (
        <Header
          title={t("movementForm.createTitle")}
          subtitle={t("movementForm.createSubtitle")}
        />
      ) : (
        <Header
          title={t("movementForm.editTitle")}
          subtitle={t("movementForm.editSubtitle")}
        />
      )}

      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box
            display="grid"
            gap="30px"
            width={"50%"}
            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
            sx={{
              "& > div": "span 4",
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="date"
              InputLabelProps={{ shrink: true }}
              label={t("movementForm.Date")}
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="date"
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label={t("movementForm.Amount")}
              value={formik.values.amount}
              onChange={formik.handleChange}
              name="amount"
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label={t("movementForm.thirdParty")}
              value={formik.values.thirdParty}
              onChange={formik.handleChange}
              name="thirdParty"
              error={
                formik.touched.thirdParty && Boolean(formik.errors.thirdParty)
              }
              helperText={formik.touched.thirdParty && formik.errors.thirdParty}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label={t("movementForm.Description")}
              value={formik.values.description}
              onChange={formik.handleChange}
              name="description"
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              sx={{ gridColumn: "span 3" }}
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
        </Box>
      </form>
    </Box>
  );
};

export default MovementForm;
