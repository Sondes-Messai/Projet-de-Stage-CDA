import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import SettingsService from "../../services/SettingsService";
import configData from "../../config.json";
import CompanySettings from "../../models/settings/CompanySettings";

interface props {
  company?: CompanySettings;
}
const CompanyForm = ({ company }: props) => {
  const [selectedImage, setSelectedImage] = useState<File | null>();

  const { t } = useTranslation();

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{2,5}[ -]?[0-9]{2,4}$/;

  const dunsRegExp = /^([0-9]{3})[ ]?([0-9]{3})[ ]?([0-9]{3})[ ]?([0-9]{5})$/;

  const validationSchema = yup.object().shape({
    firstname: yup.string().required(t("common.required").toString()),
    lastname: yup.string().required(t("common.required").toString()),
    tradename: yup.string().nullable(),
    address: yup.string().required(t("common.required").toString()),
    zip: yup.string().required(t("common.required").toString()),
    town: yup.string().required(t("common.required").toString()),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, t("common.InvalidPhoneNumber").toString())
      .required(t("common.required").toString()),
    duns: yup
      .string()
      .matches(dunsRegExp, t("common.InvalidDUNS").toString())
      .required(t("common.required").toString()),
  });

  const formik = useFormik({
    initialValues: {
      firstname: (company && company.firstname) || "",
      lastname: (company && company.lastname) || "",
      tradename: (company && company.tradename) || "",
      address: (company && company.address) || "",
      zip: (company && company.zip) || "",
      town: (company && company.town) || "",
      phoneNumber: (company && company.phoneNumber) || "",
      duns: (company && company.duns) || "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values: CompanySettings) => {
      selectedImage && SettingsService.upload(selectedImage);
      SettingsService.save(values);
      setSelectedImage(null);
    },
  });

  return (
    <Box m="0 20px">
      <form onSubmit={formik.handleSubmit}>
        <Box m="20px">
          <Box m="20px">
            <Box
              component="img"
              alt="not fount"
              width={"250px"}
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : `${configData.BACKEND_URL}settings/logo`
              }
            />
          </Box>

          <TextField
            type="file"
            name="myImage"
            onChange={(event: React.ChangeEvent) => {
              const target = event.target as HTMLInputElement;
              if (target.files) {
                const file = target.files[0];
                setSelectedImage(file);
              }
            }}
          />
        </Box>
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
            label={t("settingsScreen.Firstname")}
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="firstname"
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={t("settingsScreen.Lastname")}
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="lastname"
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={t("settingsScreen.Tradename")}
            value={formik.values.tradename}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="tradename"
            error={formik.touched.tradename && Boolean(formik.errors.tradename)}
            helperText={formik.touched.tradename && formik.errors.tradename}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={t("settingsScreen.Address")}
            value={formik.values.address}
            onChange={formik.handleChange}
            name="address"
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            sx={{ gridColumnStart: "1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={t("settingsScreen.ZipCode")}
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
            label={t("settingsScreen.Town")}
            value={formik.values.town}
            onChange={formik.handleChange}
            name="town"
            error={formik.touched.town && Boolean(formik.errors.town)}
            helperText={formik.touched.town && formik.errors.town}
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="tel"
            label={t("settingsScreen.Phone")}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            name="phoneNumber"
            sx={{ gridColumn: "span 2", gridColumnStart: "1" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label={t("settingsScreen.DUNS")}
            value={formik.values.duns}
            onChange={formik.handleChange}
            name="duns"
            error={formik.touched.duns && Boolean(formik.errors.duns)}
            helperText={formik.touched.duns && formik.errors.duns}
            sx={{ gridColumn: "span 1", gridColumnStart: "1" }}
          />
        </Box>
        <Box display="flex" justifyContent="center" mt="20px">
          <Box>
            <Button type="submit" color="secondary" variant="contained">
              {t("common.Update")}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default CompanyForm;
