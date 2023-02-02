import { Grid, Link as ExtLink } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { BsBoxArrowUpRight, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ExperiencesDetail() {
  const { idExp } = useParams();

  const [t, i18n] = useTranslation("global");

  let experiences = t("experiences", { returnObjects: true });
  let showReference = t("showReference", { returnObjects: true });

  console.log(idExp);

  let experience = experiences.find((exp) => exp.idExp === idExp);
  let navigate = useNavigate();

  return (
    <div>
      <div key={experience.id}>
        <Box p={10} pt={5} width="375" height="525" margin="1" minHeight="60vh">
          <Card sx={{ display: "flex", flexDirection: "row", aspectRatio: "stretch", height: "500" }}>
            <Grid container spacing={2}>
              <Grid item xs={4} sx={{ alignContent: "center" }}>
                <Link>
                  <BsFillArrowLeftCircleFill
                    onClick={() => navigate(-1)}
                    size="3rem"
                    style={{ color: "0069cc", paddingTop: "0.5rem", paddingLeft: "0.5rem" }}
                  />
                </Link>
                <div>
                  <CardMedia
                    component="img"
                    alt={experience.title}
                    image={experience.logo}
                    sx={{
                      marginBottom: "1rem",
                      padding: "2em 2em 2em 2em",
                      height: "15rem",
                      objectFit: "contain",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={8} sx={{}}>
                <CardContent>
                  <Typography variant="h4" component="div">
                    {experience.title}
                  </Typography>
                  <br />
                  <Typography align="center" variant="paragraph" color="text.secondary">
                    {experience.description}{" "}
                  </Typography>
                  <br />
                </CardContent>
                <CardActions sx={{}}>
                  <ExtLink target="_blank" href={experience.reference} style={{ textDecoration: "none" }}>
                    <Button variant="outlined" size="small">
                      <div>
                        {showReference[0].label} <BsBoxArrowUpRight />
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
