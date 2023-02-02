import { Grid, Link as ExtLink } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsBoxArrowUpRight, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EducactionDetail() {
  const { idEd } = useParams();

  const [t, i18n] = useTranslation("global");

  let educations = t("educations", { returnObjects: true });
  let showCredential = t("showCredential", { returnObjects: true });

  let education = educations.find((ed) => ed.idEd === idEd);
  let navigate = useNavigate();

  return (
    <div>
      <div key={education.id}>
        <Box p={10} pt={5} width="375" height="525" margin="1" minHeight="60vh">
          <Card sx={{ display: "flex", flexDirection: "row", aspectRatio: "stretch", height: "500" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} xl={4} sx={{ alignContent: "center" }}>
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
                    alt={education.title}
                    image={education.logo}
                    sx={{
                      marginBottom: "1rem",
                      padding: "3em 3em 3em 3em",
                      height: "15rem",
                      objectFit: "contain",
                      alignContent: "center",
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={8} xl={8} sx={{}}>
                <CardContent>
                  <Typography variant="h4" component="div">
                    {education.title}
                  </Typography>
                  <br />
                  <Typography align="justify" variant="paragraph" color="text.secondary">
                    {education.description}{" "}
                  </Typography>
                  <br />
                </CardContent>
                <CardActions sx={{}}>
                  <ExtLink target="_blank" href={education.certificate} style={{ textDecoration: "none" }}>
                    <Button variant="outlined" size="small">
                      <div>
                        {showCredential[0].label} <BsBoxArrowUpRight />
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
