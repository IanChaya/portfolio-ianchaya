import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";

import { useTranslation } from "react-i18next";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://www.linkedin.com/in/ian-chaya-91a3a5198/">
        Ian Chaya
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function StickyFooter() {
  const [t, i18n] = useTranslation("global");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 2.5,
          px: 2,
          mt: "auto",
          textAlign: "center",
          backgroundColor: "#cce6ff",
          display: "flex",
        }}
      >
        <Container maxWidth="sm">
          <Link href="https://www.linkedin.com/in/ian-chaya-91a3a5198/" style={{ margin: "1rem" }}>
            <BsLinkedin size="2rem" />
          </Link>
          <Link href="https://github.com/IanChaya" style={{ margin: "1rem" }}>
            <BsGithub size="2rem" />
          </Link>
          <Link href="https://www.instagram.com/ianchaya/?hl=es" style={{ margin: "1rem" }}>
            <BsInstagram size="2rem" />
          </Link>
          <Typography variant="body1">{t("footer.label")}</Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
