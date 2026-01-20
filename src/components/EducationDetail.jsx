import { Chip, Divider, Grid, Link as ExtLink, List, ListItem, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { BsCheckCircleFill } from "react-icons/bs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsBoxArrowUpRight, BsFillArrowLeftCircleFill, BsCalendar3, BsGeoAlt, BsTag } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EducactionDetail() {
  const { idEd } = useParams();

  const [t] = useTranslation("global");

  let educations = t("educations", { returnObjects: true });
  let showCredential = t("showCredential", { returnObjects: true });

  let education = educations.find((ed) => ed.idEd === idEd);
  let navigate = useNavigate();

  return (
    <div>
      <div key={education.id}>
        <Box p={{ xs: 2, sm: 4, md: 10 }} pt={5} margin="1" minHeight="60vh">
          <Card sx={{ display: "flex", flexDirection: "row" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} xl={4} sx={{ alignContent: "center" }}>
                <Link>
                  <BsFillArrowLeftCircleFill
                    onClick={() => navigate(-1)}
                    size="3rem"
                    style={{ color: "#0069cc", paddingTop: "0.5rem", paddingLeft: "0.5rem", cursor: "pointer" }}
                  />
                </Link>
                <div>
                  <CardMedia
                    component="img"
                    alt={education.title}
                    image={education.logo}
                    sx={{
                      marginBottom: "1rem",
                      padding: "2em",
                      height: "15rem",
                      objectFit: "contain",
                      alignContent: "center",
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={8} xl={8}>
                <CardContent sx={{ padding: { xs: 2, md: 3 } }}>
                  <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 600 }}>
                    {education.title}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                    {education.place && (
                      <Chip
                        icon={<BsGeoAlt style={{ marginLeft: "8px" }} />}
                        label={education.place}
                        variant="outlined"
                        color="primary"
                        size="small"
                      />
                    )}
                    {education.initDate && education.finishDate && (
                      <Chip
                        icon={<BsCalendar3 style={{ marginLeft: "8px" }} />}
                        label={`${education.initDate} - ${education.finishDate}`}
                        variant="outlined"
                        size="small"
                      />
                    )}
                    {education.category && (
                      <Chip
                        icon={<BsTag style={{ marginLeft: "8px" }} />}
                        label={education.category}
                        variant="outlined"
                        size="small"
                      />
                    )}
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  <List dense sx={{ py: 0 }}>
                    {education.description.split(" - ").map((item, index) => (
                      <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 28 }}>
                          <BsCheckCircleFill style={{ color: "#0069cc", fontSize: "0.9rem" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={item.trim()}
                          primaryTypographyProps={{
                            variant: "body2",
                            color: "text.secondary",
                            sx: { lineHeight: 1.6 },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions sx={{ padding: { xs: 2, md: 3 }, paddingTop: 0 }}>
                  {education.certificate && (
                    <ExtLink target="_blank" href={education.certificate} style={{ textDecoration: "none" }}>
                      <Button variant="outlined" size="small" endIcon={<BsBoxArrowUpRight />}>
                        {showCredential[0].label}
                      </Button>
                    </ExtLink>
                  )}
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </div>
    </div>
  );
}
