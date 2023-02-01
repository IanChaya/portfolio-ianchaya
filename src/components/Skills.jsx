import React from "react";
// import { skills } from "../Data/Data.js";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Link as ExtLink } from "@mui/material";
import { minHeight } from "@mui/system";
import { BsBoxArrowUpRight } from "react-icons/bs";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SkillsCategories from "./SkillsCategories.jsx";

import Rating from "@mui/material/Rating";

import { useContext } from "react";
import { Context } from "./ContextComponent";

import {useTranslation} from "react-i18next";

export default function Skills() {
  const { categoriesSkills, valueSkills, setValueSkills, inputValueSkills, setInputValueSkills } = useContext(Context);

  const [t, i18n] = useTranslation("global");

  let skills = t('skills', { returnObjects: true });

  console.log("skills")

  let skillsFound;

  let valueFound = valueSkills.label;

  if (valueFound === "Todas" || valueFound === "All" || valueFound === "Toutes" || valueFound === undefined) {
    skillsFound = skills;
  } else {
    skillsFound = skills.filter(skill => skill.category === valueFound);
  }

  console.log(skillsFound)

  return (
    <div>
      <Grid container justifyContent="flex-end" padding={3}>
        <SkillsCategories align="end"></SkillsCategories>
      </Grid>

      <div sx={{ alignItems: "center" }}>
        <Stack>
          <Box p={10} pt={2.5} minHeight="100vh" >
            <Grid container spacing={10} justifyContent="center">
              {skillsFound.map((item, i) => {
                return (
                  <Grid key={i} item>
                    <div key={item.id} >
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
                          {/* <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography> */}
                        </CardContent>
                        {/* <CardActions sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <ExtLink target="_blank" href={item.certificate} style={{ textDecoration: "none" }}>
                          <Button variant="outlined" size="small">
                            <div>
                              Mostrar Credencial <BsBoxArrowUpRight />
                            </div>
                          </Button>
                        </ExtLink>
                      </CardActions> */}
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
