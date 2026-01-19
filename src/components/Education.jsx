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
  return (
    <div>
      <Grid container justifyContent="flex-end" padding={3}>
        <EducationCategories align="end"></EducationCategories>
      </Grid>

      <div sx={{ alignItems: "center" }}>
        <Stack>
          <Box p={5} pt={2} minHeight="100vh">
            <Grid container spacing={7.5} justifyContent="center">
              {EducationFound.map((item, i) => {
                return (
                  <Grid key={i} item>
                    <div key={item.id} sx={{ justifyContent: "center", alignItems: "center" }}>
                      <Card
                        className="skill-boxes"
                        sx={{
                          width: { xs: "280px", sm: "300px", md: "320px" },
                          height: { xs: "340px", sm: "350px", md: "360px" },
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Link to={"/portfolio-ianchaya/Education/" + item.idEd}>
                          <CardMedia
                            component="img"
                            alt={item.title}
                            image={item.logo}
                            sx={{ padding: "2em 2em 0 2em", height: { xs: "10rem", sm: "11rem", md: "12.5rem" }, width: { xs: "16rem", sm: "18rem", md: "20rem" }, objectFit: "contain" }}
                          />
                        </Link>

                        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.5rem 1rem" }}>
                          <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: "center", fontSize: "1rem", fontWeight: 500, marginBottom: "0.25rem" }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                            {item.initDate} ➜ {item.finishDate}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.5rem 1rem 1rem" }}>
                          <ExtLink target="_blank" href={item.certificate} style={{ textDecoration: "none" }}>
                            <Button variant="outlined" size="small">
                              <div>
                                {showCredential[0].label} <BsBoxArrowUpRight />
                              </div>
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
    </div>
  );
}
