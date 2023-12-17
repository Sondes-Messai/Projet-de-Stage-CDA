import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useFormik } from "formik";
import InvoiceService from "../../services/InvoiceService";
import { useTranslation } from "react-i18next";
import Invoice from "../../models/invoices/Invoice";

interface props {
  show: boolean;
  setShowModal: Function;
  invoice?: Invoice;
  updateInvoiceList: Function;
}

const DeleteModal = (params: props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(params.show);
  }, [params.show]);

  const handleClose = () => params.setShowModal(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: `${colors.primary[400]}`,
    border: `2px solid ${colors.primary[400]}`,
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  const formik = useFormik({
    initialValues: {
      id: params.invoice?.id,
      invoice: params.invoice,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.id)
        InvoiceService.deleteInvoice(values.id)
          .then((data) => {
            params.updateInvoiceList(values.invoice);
            handleClose();
          })
          .catch((reason) => console.error(reason));
    },
  });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            color={theme.palette.secondary.main}
          >
            {t("deleteModal.Title")}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box display="flex" justifyContent="center" mt="20px">
              <Box pr="20px">
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleClose}
                >
                  {t("common.Cancel")}
                </Button>
              </Box>
              <Box>
                <Button type="submit" color="secondary" variant="contained">
                  {t("common.Confirm")}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteModal;
