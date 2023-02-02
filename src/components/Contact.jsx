import emailjs from "@emailjs/browser";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTranslation } from "react-i18next";

export default function Contacto() {
  const [t, i18n] = useTranslation("global");

  const emailSent = () => {
    toast.success("Mail Enviado", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    deleteForm();
  };

  function sentPressed(email) {
    emailSent();
    return true;
  }

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_d0gbhro", "template_0fj256d", form.current, "pXOMPuZh0yVsEg1W9").then(
      (result) => {
        console.log(result.text);
        console.log("message sent");
        if (result.text === "OK") {
          sentPressed();
        }
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  const deleteForm = () => {
    document.getElementById("form").reset();
  };

  return (
    <>
      <div className="contenedor-form">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <h1 style={{ display: "flex", justifyContent: "center" }}>{t("contact.title")}</h1>
              <form id="form" class="topBefore" ref={form} onSubmit={sendEmail}>
                <input id="name" type="text" name="user_name" placeholder={t("contact.name")} />
                <br />
                <input id="email" type="email" name="user_email" placeholder={t("contact.email")} />
                <input id="telefono" type="tel" name="user_tel" placeholder={t("contact.phone")} />
                <br />
                <textarea id="textarea" name="message" placeholder={t("contact.message")} />
                <br />
                <br />
                <input className="send-button" type="submit" value={t("contact.send")} />
              </form>
            </Grid>
          </Grid>
        </Box>
      </div>
      <ToastContainer />
    </>
  );
}
