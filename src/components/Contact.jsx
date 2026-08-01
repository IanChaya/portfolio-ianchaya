import emailjs from "@emailjs/browser";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTranslation } from "react-i18next";

function InfoRow({ icon, label, href, onClick }) {
  const content = (
    <>
      <Box
        sx={{
          flexShrink: 0,
          width: 26,
          height: 26,
          borderRadius: "8px",
          bgcolor: "rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.82rem",
        }}
      >
        {icon}
      </Box>
      <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: "#fff" }}>{label}</Typography>
    </>
  );

  const rowSx = {
    display: "flex",
    alignItems: "center",
    gap: 1,
    textDecoration: "none",
    color: "inherit",
  };

  if (href) {
    return (
      <Box component="a" href={href} target="_blank" rel="noopener noreferrer" sx={rowSx}>
        {content}
      </Box>
    );
  }

  if (onClick) {
    return (
      <Box
        component="button"
        type="button"
        onClick={onClick}
        sx={{ ...rowSx, border: "none", background: "none", p: 0, cursor: "pointer", font: "inherit", textAlign: "left" }}
      >
        {content}
      </Box>
    );
  }

  return <Box sx={rowSx}>{content}</Box>;
}

export default function Contacto() {
  const [t] = useTranslation("global");
  const [sending, setSending] = useState(false);

  const form = useRef();
  const nameFieldRef = useRef();

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

  const focusForm = () => {
    const el = nameFieldRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus();
  };

  const roles = t("contact.roles", { returnObjects: true });

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", px: { xs: 2, sm: 4, md: 8 }, py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 1100,
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 20px 50px -25px rgba(15, 30, 50, 0.35)",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "0.62fr 1.38fr" },
          }}
        >
          {/* Info sidebar */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(150deg, #0069cc 0%, #00509e 100%)",
              color: "#fff",
              p: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Box
              className="hero-blob"
              sx={{
                width: 180,
                height: 180,
                top: -50,
                right: -40,
                background: "radial-gradient(circle, #ff9d5c, transparent 70%)",
              }}
            />
            <Box
              className="hero-blob"
              sx={{
                width: 200,
                height: 200,
                bottom: -70,
                left: -60,
                background: "radial-gradient(circle, #ffffff, transparent 70%)",
                opacity: 0.15,
              }}
            />

            <Typography sx={{ position: "relative", fontSize: "0.8rem", fontWeight: 600, opacity: 0.85 }}>
              Ian Chaya
            </Typography>
            <Typography
              sx={{ position: "relative", fontSize: { xs: "1.6rem", md: "1.7rem" }, fontWeight: 700, lineHeight: 1.15 }}
            >
              {t("contact.heading")}
            </Typography>

            <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ position: "relative" }}>
              {roles.map((role, i) => (
                <Box
                  key={i}
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    px: 1.1,
                    py: 0.4,
                    borderRadius: 999,
                    bgcolor: "rgba(255,255,255,0.16)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {role}
                </Box>
              ))}
            </Stack>

            <Stack spacing={1} sx={{ position: "relative", mt: 1 }}>
              <InfoRow icon="✉️" label={t("contact.email")} onClick={focusForm} />
              <InfoRow icon="💼" label={t("contact.linkedinLabel")} href="https://www.linkedin.com/in/ian-chaya-91a3a5198/" />
              <InfoRow icon="📍" label={t("hero.location")} />
            </Stack>
          </Box>

          {/* Form */}
          <Box sx={{ bgcolor: "#fff", p: { xs: 3, md: 4 }, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              {t("contact.title")}
            </Typography>
            <Box component="form" ref={form} onSubmit={sendEmail} noValidate>
              <Stack spacing={1.75}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.75}>
                  <TextField
                    inputRef={nameFieldRef}
                    size="small"
                    name="user_name"
                    label={t("contact.name")}
                    variant="outlined"
                    fullWidth
                    required
                  />
                  <TextField
                    size="small"
                    name="user_email"
                    type="email"
                    label={t("contact.email")}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Stack>
                <TextField size="small" name="user_tel" type="tel" label={t("contact.phone")} variant="outlined" fullWidth />
                <TextField
                  size="small"
                  name="message"
                  label={t("contact.message")}
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={3}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={sending}
                  startIcon={sending ? <CircularProgress size={16} color="inherit" /> : null}
                  sx={{ borderRadius: 999, alignSelf: "flex-start", px: 3 }}
                >
                  {sending ? t("contact.sending") : t("contact.send")}
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
