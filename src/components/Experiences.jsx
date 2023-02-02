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
import { useTranslation } from "react-i18next";

export default function Experiences() {
  const [t, i18n] = useTranslation("global");

  let experiences = t("experiences", { returnObjects: true });
  let showReference = t("showReference", { returnObjects: true });

  return (
    <div sx={{ alignItems: "center" }}>
      <Stack>
        <Box p={2} pt={5} minHeight="100vh">
          <Grid container spacing={7.5} justifyContent="center">
            {experiences.map((item, i) => {
              return (
                <Grid key={i} item>
                  <div key={item.id}>
                    <Card className="skill-boxes" sx={{ maxWidth: 345, minHeight: "65vh" }}>
                      <Link to={"/Experiences/" + item.idExp}>
                        <CardMedia
                          component="img"
                          alt={item.title}
                          image={item.logo}
                          sx={{ padding: "2em 2em 0 2em", height: "12.5rem", width: "20rem", objectFit: "contain" }}
                        />
                      </Link>
                      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center" }}>
                          {item.title} | {item.entreprise}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.initDate} ➜ {item.finishDate}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <ExtLink target="_blank" href={item.reference} style={{ textDecoration: "none" }}>
                          <Button variant="outlined" size="small">
                            <div>
                              {showReference[0].label} <BsBoxArrowUpRight />
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
  );
}
