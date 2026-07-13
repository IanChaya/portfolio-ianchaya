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
import { BsBoxArrowUpRight, BsArrowLeft, BsCalendar3, BsGeoAlt, BsBuilding } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ExperiencesDetail() {
  const { idExp } = useParams();

  const [t] = useTranslation("global");

  let experiences = t("experiences", { returnObjects: true });
  let showReference = t("showReference", { returnObjects: true });

  let experience = experiences.find((exp) => exp.idExp === idExp);
  let navigate = useNavigate();

  return (
    <div>
      <div key={experience.id}>
        <Box p={{ xs: 2, sm: 4, md: 10 }} pt={5} margin="1" minHeight="60vh">
          <Button
            onClick={() => navigate(-1)}
            startIcon={<BsArrowLeft />}
            sx={{ mb: 2, color: "#0069cc" }}
          >
            {t("backButton")}
          </Button>
          <Card sx={{ display: "flex", flexDirection: "row", borderRadius: 3, overflow: "hidden" }}>
            <Grid container spacing={0}>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                xl={4}
                sx={{ bgcolor: "grey.50", display: "flex", alignItems: "center", justifyContent: "center", p: 4 }}
              >
                <CardMedia
                  component="img"
                  alt={experience.title}
                  image={experience.logo}
                  sx={{
                    maxHeight: "16rem",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={8} xl={8}>
                <CardContent sx={{ padding: { xs: 2, md: 3 } }}>
                  <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 600 }}>
                    {experience.title}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                    {experience.entreprise && (
                      <Chip
                        icon={<BsBuilding style={{ marginLeft: "8px" }} />}
                        label={experience.entreprise}
                        variant="outlined"
                        color="primary"
                        size="small"
                      />
                    )}
                    {experience.initDate && experience.finishDate && (
                      <Chip
                        icon={<BsCalendar3 style={{ marginLeft: "8px" }} />}
                        label={`${experience.initDate} - ${experience.finishDate}`}
                        variant="outlined"
                        size="small"
                      />
                    )}
                    {experience.place && (
                      <Chip
                        icon={<BsGeoAlt style={{ marginLeft: "8px" }} />}
                        label={experience.place}
                        variant="outlined"
                        size="small"
                      />
                    )}
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  <List dense sx={{ py: 0 }}>
                    {experience.description.split(" – ").map((item, index) => (
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
                  {experience.reference && (
                    <ExtLink target="_blank" href={experience.reference} style={{ textDecoration: "none" }}>
                      <Button variant="outlined" size="small" endIcon={<BsBoxArrowUpRight />}>
                        {showReference[0].label}
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
