import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, TextField, TextareaAutosize, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useFormik } from "formik";
import InvoiceService from "../../services/InvoiceService";
import { useTranslation } from "react-i18next";
import InvoiceMail from "../../models/invoices/InvoiceMail";
import Invoice from "../../models/invoices/Invoice";

interface props {
  show: boolean;
  setShowModal: Function;
  invoice?: Invoice;
  updateInvoiceList: Function;
}

const UnpaidModal = (params: props) => {
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
    width: 600,
    backgroundColor: `${colors.primary[400]}`,
    border: `2px solid ${colors.primary[400]}`,
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const formik = useFormik({
    initialValues: {
      id: params.invoice?.id,
      recipient: params.invoice?.customer?.email,
      subject: "Facturation " + month + "-" + year,
      body:
        "Bonjour," +
        " \n" +
        "Je n’ai, à ce jour, pas reçu le règlement pour la facture " +
        params.invoice?.id +
        " émise le " +
        params.invoice?.emittedOn +
        " ." +
        " \n" +
        "Pouvez-vous vérifier que le traitement de cette facture a été correctement effectué de votre côté et, dans le cas contraire procéder sans délai au versement correspondant ?." +
        " \n" +
        "Cordialement",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.id) {
        var mail = new InvoiceMail(
          values.recipient ? values.recipient : "",
          values.subject,
          values.body
        );
        InvoiceService.unpaidInvoice(values.id, mail)
          .then((invoice) => {
            console.log(invoice);
            params.updateInvoiceList(invoice);
            handleClose();
          })
          .catch((reason) => console.error(reason));
      }
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
            {t("unpaidModal.Title")}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label={t("unpaidModal.recipient")}
              value={formik.values.recipient}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="recipient"
              error={
                formik.touched.recipient && Boolean(formik.errors.recipient)
              }
              helperText={formik.touched.recipient && formik.errors.recipient}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label={t("unpaidModal.subject")}
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="subject"
              error={formik.touched.subject && Boolean(formik.errors.subject)}
              helperText={formik.touched.subject && formik.errors.subject}
              sx={{ gridColumn: "span 1" }}
              margin="normal"
            />

            <TextField
              fullWidth
              multiline
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="body"
              error={formik.touched.body && Boolean(formik.errors.body)}
              helperText={formik.touched.body && formik.errors.body}
              sx={{ gridColumn: "span 1" }}
              margin="normal"
            />

            <Box display="flex" justifyContent="center" mt="60px">
              <Box pr="60px">
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
                  {t("common.Send")}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UnpaidModal;
