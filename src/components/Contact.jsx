import emailjs from "@emailjs/browser";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTranslation } from "react-i18next";

export default function Contacto() {
  const [t] = useTranslation("global");
  const [sending, setSending] = useState(false);

  const form = useRef();

  const deleteForm = () => {
    document.getElementById("form").reset();
  };

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
          deleteForm();
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
      <Grid item xs={12} sm={12} md={12} xl={12} sx={{display:"flex", justifyContent:"center", alignContent:"center"}}>
        <div className="contenedor-form">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} xl={12}>
                <h1 style={{ display: "flex", justifyContent: "center", textAlign:"center"}}>{t("contact.title")}</h1>
                <form id="form" class="topBefore" ref={form} onSubmit={sendEmail}>
                  <input id="name" type="text" name="user_name" placeholder={t("contact.name")} required />
                  <br />
                  <input id="email" type="email" name="user_email" placeholder={t("contact.email")} required />
                  <input id="telefono" type="tel" name="user_tel" placeholder={t("contact.phone")} />
                  <br />
                  <textarea id="textarea" name="message" placeholder={t("contact.message")} required />
                  <br />
                  <br />
                  <input
                    className="send-button"
                    type="submit"
                    value={sending ? t("contact.sending") : t("contact.send")}
                    disabled={sending}
                  />
                </form>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Grid>
      <ToastContainer />
    </>
  );
}
