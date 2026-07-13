import emailjs from "@emailjs/browser";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTranslation } from "react-i18next";

export default function Contacto() {
  const [t] = useTranslation("global");
  const [sending, setSending] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs.sendForm("service_d0gbhro", "template_0fj256d", form.current, "pXOMPuZh0yVsEg1W9").then(
      (result) => {
        setSending(false);
        if (result.text === "OK") {
          toast.success(t("contact.successToast"), {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          form.current.reset();
        }
      },
      (error) => {
        setSending(false);
        console.log(error.text);
        toast.error(t("contact.errorToast"), {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    );
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", px: 2, py: 2 }}>
        <Card elevation={2} sx={{ width: "100%", maxWidth: 420, p: { xs: 2.5, sm: 3 }, borderRadius: 3 }}>
          <Typography variant="subtitle1" align="center" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
            {t("contact.title")}
          </Typography>
          <Box component="form" ref={form} onSubmit={sendEmail} noValidate>
            <Stack spacing={1.75}>
              <TextField size="small" name="user_name" label={t("contact.name")} variant="outlined" fullWidth required />
              <TextField size="small" name="user_email" type="email" label={t("contact.email")} variant="outlined" fullWidth required />
              <TextField size="small" name="user_tel" type="tel" label={t("contact.phone")} variant="outlined" fullWidth />
              <TextField size="small" name="message" label={t("contact.message")} variant="outlined" fullWidth required multiline rows={3} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={sending}
                startIcon={sending ? <CircularProgress size={16} color="inherit" /> : null}
              >
                {sending ? t("contact.sending") : t("contact.send")}
              </Button>
            </Stack>
          </Box>
        </Card>
      </Box>
      <ToastContainer />
    </>
  );
}
