import React from "react";
import { Link as ExtLink, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { BsBoxArrowUpRight, BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Switch back to "cards" any time to restore the old card grid — nothing deleted below.
const EXPERIENCES_LAYOUT = "rows"; // "rows" | "cards"

function parseMonthYear(mmYYYY) {
  const [m, y] = mmYYYY.split("/").map(Number);
  return y * 12 + m;
}

export default function Experiences() {
  const [t, i18n] = useTranslation("global");

  let experiences = t("experiences", { returnObjects: true });
  let showReference = t("showReference", { returnObjects: true });

  return (
    <div sx={{ alignItems: "center" }}>
      {EXPERIENCES_LAYOUT === "cards" ? (
        <Stack>
          <Box p={2} pt={5}>
            <Grid container spacing={7.5} justifyContent="center">
              {experiences.map((item, i) => {
                return (
                  <Grid key={i} item>
                    <div key={item.id}>
                      <Card
                        className="skill-boxes"
                        sx={{
                          width: { xs: "280px", sm: "300px", md: "320px" },
                          height: { xs: "350px", sm: "360px", md: "370px" },
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Link to={"/portfolio-ianchaya/Experiences/" + item.idExp} style={{ textDecoration: "none", color: "inherit" }}>
                          <CardMedia
                            component="img"
                            alt={item.title}
                            image={item.logo}
                            sx={{ padding: "2em 2em 0 2em", height: { xs: "10rem", sm: "11rem", md: "12.5rem" }, width: { xs: "16rem", sm: "18rem", md: "20rem" }, objectFit: "contain", cursor: "pointer" }}
                          />
                          <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.5rem 1rem", cursor: "pointer" }}>
                            <Box sx={{ minHeight: "2.6em", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                sx={{
                                  textAlign: "center",
                                  fontSize: "1rem",
                                  fontWeight: 500,
                                  marginBottom: 0,
                                  lineHeight: 1.3,
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {item.title} | {item.entreprise}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                              {item.initDate} ➜ {item.finishDate}
                            </Typography>
                          </CardContent>
                        </Link>
                        <CardActions sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.5rem 1rem 1.5rem" }}>
                          {item.reference && (
                            <ExtLink target="_blank" href={item.reference} style={{ textDecoration: "none" }}>
                              <Button variant="outlined" size="small" endIcon={<BsBoxArrowUpRight />}>
                                {showReference[0].label}
                              </Button>
                            </ExtLink>
                          )}
                        </CardActions>
                      </Card>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Stack>
      ) : (
        <Box px={{ xs: 2, sm: 4, md: 8 }} py={5}>
          <Box sx={{ maxWidth: 760, mx: "auto", borderTop: "1px solid", borderColor: "divider" }}>
            {[...experiences]
              .sort((a, b) => parseMonthYear(b.initDate) - parseMonthYear(a.initDate))
              .map((item, i) => {
                const isCurrent = item.finishDate === "Present";
                return (
                  <Link
                    key={i}
                    to={"/portfolio-ianchaya/Experiences/" + item.idExp}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        py: 1.75,
                        px: 1.5,
                        ml: -1.5,
                        mr: -1.5,
                        borderRadius: 2,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        cursor: "pointer",
                        transition: "background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease",
                        "&:hover": {
                          bgcolor: "#eaf2fc",
                          transform: "translateX(4px)",
                          boxShadow: "0 4px 14px rgba(0, 105, 204, 0.12)",
                        },
                        "&:hover .exp-arrow": { transform: "translateX(4px)", color: "primary.main" },
                      }}
                    >
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          bgcolor: "#fff",
                          border: "1px solid",
                          borderColor: "divider",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          overflow: "hidden",
                        }}
                      >
                        <Box component="img" src={item.logo} alt={item.entreprise} sx={{ maxWidth: "75%", maxHeight: "75%", objectFit: "contain" }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            color: isCurrent ? "#22c55e" : "primary.main",
                          }}
                        >
                          {isCurrent ? `Current role · ${item.entreprise}` : item.entreprise}
                        </Typography>
                        <Typography sx={{ fontWeight: 700, fontSize: "1.02rem", my: 0.2 }}>{item.title}</Typography>
                        <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
                          {item.place} · {item.initDate} – {item.finishDate}
                        </Typography>
                      </Box>
                      <BsChevronRight className="exp-arrow" style={{ color: "#9aa5b1", flexShrink: 0, transition: "transform 0.15s ease, color 0.15s ease" }} />
                    </Box>
                  </Link>
                );
              })}
          </Box>
        </Box>
      )}
    </div>
  );
}
