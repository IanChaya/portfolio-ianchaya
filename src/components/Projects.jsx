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
import { BsBoxArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./ContextComponent";
import ProjectsCategories from "./ProjectsCategories.jsx";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { valueProjects } = useContext(Context);
  const [t, i18n] = useTranslation("global");

  let projects = t("projects", { returnObjects: true });
  let showMore = t("showMore", { returnObjects: true });
  let projectFound;
  let valueFound = valueProjects.label;

  if (valueFound === "Todos" || valueFound === "All" || valueFound === "Toutes" || valueFound === undefined) {
    projectFound = projects;
  } else {
    projectFound = projects.filter((skill) => skill.category === valueFound);
  }
  return (
    <div sx={{maxWidth:"100%"}}>
      <Grid container justifyContent="flex-end" maxWidth="100%" padding={3}>
        <ProjectsCategories align="end"></ProjectsCategories>
      </Grid>

      <div sx={{ alignItems: "center", maxWidth:"100%"}}>
        <Stack>
          <Box p={5} pt={2} minHeight="100vh" maxWidth="100%" >
            <Grid container spacing={7.5} justifyContent="center">
              {projectFound.map((item, i) => {
                return (
                  <Grid key={i} item>
                    <div key={item.id} sx={{ justifyContent: "center", alignItems: "center"}}>
                      <Card
                        className="skill-boxes"
                        sx={{
                          maxWidth: "50vh",
                          minHeight: "57.5vh",
                          minWidth: "39vh",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Link to={"/portfolio-ianchaya/Projects/" + item.idProj}>
                          <CardMedia
                            component="img"
                            alt={item.title}
                            image={item.logo}
                            sx={{ padding: "2em 2em 0 2em", height: "12.5rem", width: "20rem", margin: 0, maxWidth:"100%", objectFit: "contain" }}
                          />
                        </Link>

                        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                          <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center", maxWidth:"100%", padding:"1rem" }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center"}}>
                            {item.initDate} ➜ {item.finishDate}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <ExtLink target="_blank" href={item.info} style={{ textDecoration: "none" }}>
                            <Button variant="outlined" size="small">
                              <div>
                                {showMore[0].label}
                                <BsBoxArrowUpRight />
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
