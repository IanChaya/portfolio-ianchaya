import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "./ContextComponent";
import SkillsCategories from "./SkillsCategories.jsx";

export default function Skills() {
  const { valueSkills } = useContext(Context);
  const [t, i18n] = useTranslation("global");

  let skills = t("skills", { returnObjects: true });
  let skillsFound;
  let valueFound = valueSkills.label;

  if (valueFound === "Todas" || valueFound === "All" || valueFound === "Toutes" || valueFound === undefined) {
    skillsFound = skills;
  } else {
    skillsFound = skills.filter((skill) => skill.category === valueFound);
  }

  return (
    <div>
      <Grid container justifyContent="flex-end" padding={3}>
        <SkillsCategories align="end"></SkillsCategories>
      </Grid>

      <div sx={{ alignItems: "center" }}>
        <Stack>
          <Box p={10} pt={2.5} minHeight="100vh">
            <Grid container spacing={10} justifyContent="center">
              {skillsFound.map((item, i) => {
                return (
                  <Grid key={i} item>
                    <div key={item.id}>
                      <Card sx={{ maxWidth: 200, minHeight: "30vh" }} className="skill-boxes">
                        <CardMedia
                          component="img"
                          alt={item.title}
                          image={item.logo}
                          sx={{ padding: "2em 2em 0 2em", height: "10rem", objectFit: "contain" }}
                        />
                        <CardContent
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                          </Typography>
                          <Stack spacing={1}>
                            <Rating name="half-rating-read" value={item.rating} precision={0.5} readOnly />
                          </Stack>
                        </CardContent>
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
