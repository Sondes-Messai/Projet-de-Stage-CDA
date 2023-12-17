import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Header from "../global/Header";
import { useNavigate } from "react-router-dom";
import CustomerService from "../../services/CustomerService";
import { useTranslation } from "react-i18next";
import Customer from "../../models/Customers/Customer";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{2,5}[ -]?[0-9]{2,4}$/;

interface props {
  customer: Customer;
}

const CustomerForm = (param: props) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleBack = () => {
    navigate(`/customers/`);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required(t("common.required").toString()),
    address: yup.string().required(t("common.required").toString()),
    zip: yup.string().required(t("common.required").toString()),
    town: yup.string().required(t("common.required").toString()),
    website: yup.string().url("common.InvalidWebsite").optional(),
    email: yup
      .string()
      .email(t("common.invalidEmail").toString())
      .required(t("common.required").toString()),
    phone: yup
      .string()
      .matches(phoneRegExp, t("common.InvalidPhoneNumber").toString())
      .required(t("common.required").toString()),
    mobile: yup
      .string()
      .matches(phoneRegExp, t("common.InvalidPhoneNumber").toString())
      .optional()
      .nullable(),
  });

  const formik = useFormik({
    initialValues: {
      id: param.customer.id,
      name: param.customer.name,
      address: param.customer.address,
      zip: param.customer.zip,
      town: param.customer.town,
      phone: param.customer.phone,
      mobile: param.customer.mobile,
      website: param.customer.website,
      email: param.customer.email,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      CustomerService.saveCustomer(values)
        .then(() => handleBack())
        .catch((reason) => console.error(reason));
    },
  });

  return (
    <Box m="0 20px">
      {formik.initialValues.id === undefined ? (
        <Header
          title={t("customerForm.createTitle")}
          subtitle={t("customerForm.createSubtitle")}
        />
      ) : (
        <Header
          title={t("customerForm.editTitle")}
          subtitle={t("customerForm.editSubtitle")}
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
            label={t("customerForm.Name")}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ gridColumn: "span 3" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={t("customerForm.Address")}
            value={formik.values.address}
            onChange={formik.handleChange}
            name="address"
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={t("customerForm.ZipCode")}
            value={formik.values.zip}
            onChange={formik.handleChange}
            name="zip"
            error={formik.touched.zip && Boolean(formik.errors.zip)}
            helperText={formik.touched.zip && formik.errors.zip}
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={t("customerForm.Town")}
            value={formik.values.town}
            onChange={formik.handleChange}
            name="town"
            error={formik.touched.town && Boolean(formik.errors.town)}
            helperText={formik.touched.town && formik.errors.town}
            sx={{ gridColumn: "span 3" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="tel"
            label={t("customerForm.Phone")}
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            name="phone"
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="tel"
            label={t("customerForm.Cellular")}
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
            name="mobile"
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="email"
            label={t("customerForm.Email")}
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="url"
            label={t("customerForm.Website")}
            value={formik.values.website}
            onChange={formik.handleChange}
            name="website"
            error={formik.touched.website && Boolean(formik.errors.website)}
            helperText={formik.touched.website && formik.errors.website}
            sx={{ gridColumn: "span 2" }}
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

export default CustomerForm;
