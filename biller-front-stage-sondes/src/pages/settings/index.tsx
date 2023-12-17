import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CompanyForm from "../../components/company/CompanyForm";
import Header from "../../components/global/Header";
import Loading from "../../components/global/Loading";
import SettingsService from "../../services/SettingsService";
import CompanySettings from "../../models/settings/CompanySettings";

const Settings = () => {
  const { t } = useTranslation();

  const [company, setCompany] = useState<CompanySettings>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    SettingsService.getDetails().then((company) => {
      setCompany(company);
      setIsLoading(false);
    });
  }, []);

  //const [selectedImage, setSelectedImage] = useState();

  return (
    <Box m="0 20px">
      <Header
        title={t("settingsScreen.Title")}
        subtitle={t("settingsScreen.Subtitle")}
      />
      {!isLoading ? <CompanyForm company={company} /> : <Loading />}
    </Box>
  );
};

export default Settings;
