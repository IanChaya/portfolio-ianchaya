import { Link as ExtLink, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./ContextComponent";
import EducationCategories from "./EducationCategories.jsx";
import { useTranslation } from "react-i18next";

// Switch back to "cards" any time to restore the old card grid — nothing deleted below.
const EDUCATION_LAYOUT = "columns"; // "columns" | "cards"

function parseMonthYear(mmYYYY) {
  const [m, y] = mmYYYY.split("/").map(Number);
  return y * 12 + m;
}

export default function Education() {
  const { valueEducation } = useContext(Context);

  const [t, i18n] = useTranslation("global");

  let educations = t("educations", { returnObjects: true });
  let showCredential = t("showCredential", { returnObjects: true });
  let EducationFound;
  let valueFound = valueEducation.label;

  if (valueFound === "Todas" || valueFound === "All" || valueFound === "Toutes" || valueFound === undefined) {
    EducationFound = educations;
  } else {
    EducationFound = educations.filter((skill) => skill.category === valueFound);
  }

  const categoryOrder = t("categoriesEducation", { returnObjects: true })
    .map((c) => c.label)
    .filter((label) => label !== "All" && label !== "Todas" && label !== "Toutes");

  const groups = categoryOrder
    .map((cat) => ({
      category: cat,
      items: [...EducationFound.filter((ed) => ed.category === cat)].sort(
        (a, b) => parseMonthYear(b.initDate) - parseMonthYear(a.initDate)
      ),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div>
      {EDUCATION_LAYOUT === "cards" && (
        <Grid container justifyContent="flex-end" padding={3}>
          <EducationCategories align="end"></EducationCategories>
        </Grid>
      )}

      {EDUCATION_LAYOUT === "cards" ? (
        <div sx={{ alignItems: "center" }}>
          <Stack>
            <Box p={5} pt={2}>
              <Grid container spacing={7.5} justifyContent="center">
                {EducationFound.map((item, i) => {
                  return (
                    <Grid key={i} item>
                      <div key={item.id} sx={{ justifyContent: "center", alignItems: "center" }}>
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
                          <Link to={"/portfolio-ianchaya/Education/" + item.idEd} style={{ textDecoration: "none", color: "inherit" }}>
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
                                  {item.title}
                                </Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                                {item.initDate} ➜ {item.finishDate}
                              </Typography>
                            </CardContent>
                          </Link>
                          <CardActions sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.5rem 1rem 1.5rem" }}>
                            <ExtLink target="_blank" href={item.certificate} style={{ textDecoration: "none" }}>
                              <Button variant="outlined" size="small" endIcon={<BsBoxArrowUpRight />}>
                                {showCredential[0].label}
                              </Button>
                            </ExtLink>
                          </CardActions>
                        </Card>
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Stack>
        </div>
      ) : (
        <Box px={{ xs: 2, sm: 4, md: 8 }} py={5}>
          <Grid container spacing={4}>
            {groups.map((group) => (
              <Grid item xs={12} md={12 / groups.length} key={group.category}>
                <Typography sx={{ fontWeight: 700, fontSize: "0.98rem", mb: 1.5 }}>
                  {group.category} <Box component="span" sx={{ fontSize: "0.75rem", fontWeight: 600, color: "text.secondary" }}>({group.items.length})</Box>
                </Typography>
                <Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
                  {group.items.map((ed, i) => (
                    <Link key={i} to={"/portfolio-ianchaya/Education/" + ed.idEd} style={{ textDecoration: "none", color: "inherit" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1.2,
                          py: 1.4,
                          px: 1,
                          ml: -1,
                          mr: -1,
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
                        }}
                      >
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 1.5,
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
                          <Box component="img" src={ed.logo} alt={ed.place} sx={{ maxWidth: "75%", maxHeight: "75%", objectFit: "contain" }} />
                        </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: "0.98rem", lineHeight: 1.35 }}>{ed.title}</Typography>
                          <Typography sx={{ fontSize: "0.72rem", color: "text.secondary" }}>
                            {ed.initDate} – {ed.finishDate}
                          </Typography>
                        </Box>
                      </Box>
                    </Link>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </div>
  );
}
