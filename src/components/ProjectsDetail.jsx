import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import { proyectos } from "../Data/Data.js";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { BsBoxArrowUpRight, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link as ExtLink } from "@mui/material";
import { useNavigate} from "react-router-dom";

import {useTranslation} from "react-i18next";

export default function ProjectsDetail() {
  const { idProj } = useParams();

  const [t, i18n] = useTranslation("global");

  let projects = t('projects', { returnObjects: true });
  let showMore = t("showMore", { returnObjects: true });

  let project = projects.find((proj) => proj.idProj == idProj);
  let navigate = useNavigate();
  console.log(projects);

  return (
    <div>
      <div key={project.id}>
        <Box p={10} pt={5} width="375" height="525" margin="1" minHeight="60vh">
          <Card sx={{ display: "flex", flexDirection: "row", aspectRatio: "stretch", height: "500" }}>
            <Grid container spacing={2}>
              <Grid item xs={4} sx={{ alignContent: "center" }}>
                <Link>
                  <BsFillArrowLeftCircleFill onClick={() => navigate(-1)} size="3rem" style={{ color: "0069cc", paddingTop:"0.5rem", paddingLeft:"0.5rem" }} />
                </Link>
                <div>
                  <CardMedia
                    component="img"
                    alt={project.title}
                    image={project.logo}
                    sx={{
                      marginBottom: "1rem",
                      padding: "3em 3em 0 3em",
                      height: "15rem",
                      objectFit: "contain",
                      alignContent: "center",
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={8} sx={{}}>
                <CardContent>
                  <Typography variant="h4" component="div">
                    {project.title}
                  </Typography>
                  <br />
                  <Typography align="justify" variant="paragraph" color="text.secondary">
                    {project.description}{" "}
                  </Typography>
                  <br />
                </CardContent>
                <CardActions sx={{}}>
                  <ExtLink target="_blank" href={project.info} style={{ textDecoration: "none" }}>
                    <Button variant="outlined" size="small">
                      <div>
                      {showMore[0].label} <BsBoxArrowUpRight />
                      </div>
                    </Button>
                  </ExtLink>
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </div>
      ;
    </div>
  );
}
