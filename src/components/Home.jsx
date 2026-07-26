import { Grid, Link as ExtLink } from "@mui/material";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BsFileEarmarkPdf, BsEnvelope, BsLinkedin, BsGithub, BsChevronDown } from "react-icons/bs";
import TypeWriter from "./TypeWriter";
import RotatingTypewriter from "./RotatingTypewriter";
import image from "../wave-haikei23.svg";
import ianchayaFoto from "../ianchayafoto.png";
import Contact from "./Contact";
import Education from "./Education";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Skills from "./Skills";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

// Switch back to "old" any time to restore the original wave-background hero — nothing deleted below.
const HERO_LAYOUT = "blob"; // "blob" | "old"

export default function Home() {
  const [t, i18n] = useTranslation("global");
  const [expanded, setExpanded] = useState(false);

  const roles = t("hero.roles", { returnObjects: true });
  const facts = t("hero.facts", { returnObjects: true });

  return (
    <>
      {HERO_LAYOUT === "old" ? (
        <Box
          className="container-presentation"
          sx={{ flexGrow: 1, backgroundImage: `url(${image})`, minheight: "50vh", backgroundSize: "cover", overflow: "hidden", maxWidth:"100%" }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid className="container-foto-home" item xs={12} sm={12} md={4} xl={4}>
              <motion.img
                className="ian-chaya-foto"
                src={ianchayaFoto}
                alt="IanChaya-foto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </Grid>
            <Grid className="container-texto-home" item xs={12} sm={12} md={8} xl={8} sx={{}}>
              <h1>
                <TypeWriter text={t("introductionText.paragraph1")} speed={30} delay={300} />
              </h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                {t("introductionText.paragraph2")}
              </motion.h2>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                {t("introductionText.paragraph3")}
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.9 }}
              >
                {t("introductionText.paragraph4")}
              </motion.h3>
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.1 }}
              >
                {t("introductionText.paragraph5")}
              </motion.h4>
              <motion.h5
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.3 }}
              >
                {t("introductionText.paragraph6")}
              </motion.h5>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.5 }}
                style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1rem" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<BsFileEarmarkPdf />}
                  component="a"
                  href={`${process.env.PUBLIC_URL}/assets/CV-IanChaya.pdf`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    fetch("https://ntfy.sh/ianchaya-cv-alerts-2026", {
                      method: "POST",
                      body: "Someone downloaded the CV from the portfolio site",
                    }).catch(() => {});
                  }}
                >
                  {t("hero.downloadCv")}
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "#0069cc", borderColor: "#0069cc", "&:hover": { borderColor: "#0069cc", bgcolor: "#f0f6ff" } }}
                  startIcon={<BsEnvelope />}
                  onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {t("hero.contactMe")}
                </Button>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
                  <ExtLink href="https://www.linkedin.com/in/ian-chaya-91a3a5198/" target="_blank" rel="noopener noreferrer" sx={{ color: "#0069cc" }}>
                    <BsLinkedin size="1.5rem" />
                  </ExtLink>
                  <ExtLink href="https://github.com/IanChaya" target="_blank" rel="noopener noreferrer" sx={{ color: "#0069cc" }}>
                    <BsGithub size="1.5rem" />
                  </ExtLink>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            py: { xs: 6, md: 8 },
            px: 2,
          }}
        >
          <Box
            className="hero-blob"
            sx={{ width: 420, height: 420, top: -120, left: -100, background: "radial-gradient(circle, #7db9ff, transparent 70%)" }}
          />

          <Box sx={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1100, mx: "auto" }}>
          <Grid
            container
            spacing={{ xs: 3, md: 6 }}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md="auto" sx={{ display: "flex", justifyContent: "center" }}>
              <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: "easeOut" }}>
                <Box
                  sx={{
                    width: 260,
                    height: 260,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "4px solid #fff",
                    boxShadow: "0 24px 48px rgba(0, 60, 140, 0.18)",
                  }}
                >
                  <Box component="img" src={ianchayaFoto} alt="Ian Chaya" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={7} sx={{ maxWidth: 560, textAlign: { xs: "center", md: "left" } }}>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  bgcolor: "#f0f6ff",
                  color: "primary.main",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  borderRadius: 999,
                  px: 1.5,
                  py: 0.5,
                  mb: 1.5,
                }}
              >
                📍 {t("hero.location")}
              </Box>

              <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: 700, mb: 0.5 }}>
                Ian Chaya
              </Typography>

              <Typography
                component="div"
                sx={{ fontSize: { xs: "1.05rem", md: "1.2rem" }, fontWeight: 700, color: "primary.main", minHeight: "1.8rem", mb: 1.5 }}
              >
                <RotatingTypewriter words={roles} />
              </Typography>

              <Typography sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.6, mb: 1 }}>{t("hero.introShort")}</Typography>

              <Collapse in={expanded}>
                <Box
                  component="ul"
                  className="hero-fact-list"
                  sx={{ listStyle: "none", m: 0, mb: 1.5, p: 0, display: "flex", flexDirection: "column", gap: 1 }}
                >
                  {facts.map((f, i) => (
                    <li key={i}>
                      <span className="hero-fact-icon">{f.icon}</span>
                      <span>{f.text}</span>
                    </li>
                  ))}
                </Box>
              </Collapse>

              <Button
                onClick={() => setExpanded((v) => !v)}
                sx={{ color: "primary.main", fontWeight: 700, fontSize: "0.85rem", mb: 2, textTransform: "none", p: 0, "&:hover": { bgcolor: "transparent" } }}
                endIcon={
                  <BsChevronDown style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform .25s ease" }} />
                }
              >
                {expanded ? t("hero.showLess") : t("hero.readMore")}
              </Button>

              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<BsFileEarmarkPdf />}
                  component="a"
                  href={`${process.env.PUBLIC_URL}/assets/CV-IanChaya.pdf`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    fetch("https://ntfy.sh/ianchaya-cv-alerts-2026", {
                      method: "POST",
                      body: "Someone downloaded the CV from the portfolio site",
                    }).catch(() => {});
                  }}
                >
                  {t("hero.downloadCv")}
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "#0069cc", borderColor: "#0069cc", "&:hover": { borderColor: "#0069cc", bgcolor: "#f0f6ff" } }}
                  startIcon={<BsEnvelope />}
                  onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {t("hero.contactMe")}
                </Button>
                <ExtLink
                  href="https://www.linkedin.com/in/ian-chaya-91a3a5198/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    bgcolor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    color: "#0069cc",
                  }}
                >
                  <BsLinkedin size="1.1rem" />
                </ExtLink>
              </Box>
            </Grid>
          </Grid>
          </Box>
        </Box>
      )}

      <Box>
        <Divider className="divider">{t("pages.education")}</Divider>
        <Education></Education>
      </Box>
      <Box sx={{ bgcolor: "#f5f8fc" }}>
        <Divider className="divider">{t("pages.work-experiences")}</Divider>
        <Experiences></Experiences>
      </Box>
      <Box>
        <Divider className="divider">{t("pages.skills")}</Divider>
        <Skills></Skills>
      </Box>
      <Box sx={{ bgcolor: "#f5f8fc" }}>
        <Divider className="divider">{t("pages.projects")}</Divider>
        <Projects></Projects>
      </Box>
      <Box id="contacto">
        <Divider className="divider">{t("pages.contact")}</Divider>
        <Contact></Contact>
      </Box>
    </>
  );
}
