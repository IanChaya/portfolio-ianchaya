import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "./ContextComponent";
import SkillsCategories from "./SkillsCategories.jsx";

const SHOW_SKILL_RATING = false;

// Switch back any time to restore an earlier layout — nothing below was deleted.
const SKILLS_LAYOUT = "bento"; // "bento" | "grid" | "cards"

const BENTO_GRADIENTS = [
  "linear-gradient(135deg, #0069cc, #3d9bff)",
  "linear-gradient(135deg, #ff7a3d, #ffb066)",
  "linear-gradient(135deg, #0f9d58, #4bd07a)",
  "linear-gradient(135deg, #6c5ce7, #a29bfe)",
  "linear-gradient(135deg, #00b8d9, #6fe3f5)",
  "linear-gradient(135deg, #e84393, #fd79a8)",
  "linear-gradient(135deg, #2d3436, #636e72)",
];

export default function Skills() {
  const { valueSkills } = useContext(Context);
  const [t, i18n] = useTranslation("global");
  const [openCategory, setOpenCategory] = useState(null);

  let skills = t("skills", { returnObjects: true });
  let skillsFound;
  let valueFound = valueSkills.label;

  if (valueFound === "Todas" || valueFound === "All" || valueFound === "Toutes" || valueFound === undefined) {
    skillsFound = skills;
  } else {
    skillsFound = skills.filter((skill) => skill.category === valueFound);
  }

  const groupedSkills = [];
  skillsFound.forEach((skill) => {
    let group = groupedSkills.find((g) => g.category === skill.category);
    if (!group) {
      group = { category: skill.category, items: [] };
      groupedSkills.push(group);
    }
    group.items.push(skill);
  });

  // categoriesSkills also defines the display order (AI Tools / Product Management first, legacy tools last).
  const categoryOrder = t("categoriesSkills", { returnObjects: true }).map((c) => c.label);
  groupedSkills.sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category));

  return (
    <div>
      <Grid container justifyContent="center" padding={3}>
        <SkillsCategories align="end"></SkillsCategories>
      </Grid>

      {SKILLS_LAYOUT === "cards" && (
        <div sx={{ alignItems: "center" }}>
          <Stack>
            <Box p={10} pt={2.5}>
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
                            {SHOW_SKILL_RATING && (
                              <Stack spacing={1}>
                                <Rating name="half-rating-read" value={item.rating} precision={0.5} readOnly />
                              </Stack>
                            )}
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
      )}

      {SKILLS_LAYOUT === "grid" && (
        <Box px={{ xs: 2, sm: 4, md: 8 }} pb={6}>
          {groupedSkills.map((group) => (
            <Box key={group.category} sx={{ mb: 5 }}>
              <Typography
                sx={{
                  color: "primary.main",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  fontWeight: 700,
                  display: "inline-block",
                  borderBottom: "2px solid",
                  borderColor: "primary.main",
                  pb: 0.5,
                  mb: 2.5,
                }}
              >
                {group.category}
              </Typography>
              <Grid container spacing={2}>
                {group.items.map((item, i) => (
                  <Grid item key={i}>
                    <Tooltip title={item.title} arrow>
                      <Box
                        sx={{
                          width: 100,
                          height: 100,
                          bgcolor: "#f5f8fc",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          p: 2,
                          transition: "transform .15s ease, box-shadow .15s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: 4,
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src={item.logo}
                          alt={item.title}
                          sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                        />
                      </Box>
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      )}

      {SKILLS_LAYOUT === "bento" && (
        <Box px={{ xs: 2, sm: 4, md: 8 }} pb={6}>
          <Grid container spacing={2}>
            {groupedSkills.map((group, idx) => {
              const previewItems = group.items.slice(0, 4);
              const remaining = group.items.length - previewItems.length;
              return (
                <Grid item xs={12} sm={6} md={3} key={group.category}>
                  <Box
                    onClick={() => setOpenCategory(group)}
                    sx={{
                      height: 190,
                      borderRadius: 3,
                      p: 2.5,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      background: BENTO_GRADIENTS[idx % BENTO_GRADIENTS.length],
                      transition: "transform .2s cubic-bezier(.2,.8,.2,1), box-shadow .2s ease",
                      "&:hover": { transform: "translateY(-6px) scale(1.015)", boxShadow: 8 },
                    }}
                  >
                    <Typography sx={{ color: "#fff", fontWeight: 700 }}>{group.category}</Typography>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
                      {previewItems.map((item, i) => (
                        <Tooltip title={item.title} arrow key={i}>
                          <Box
                            sx={{
                              width: 38,
                              height: 38,
                              bgcolor: "rgba(255,255,255,0.92)",
                              borderRadius: 1.5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              p: 0.6,
                              boxShadow: 1,
                            }}
                          >
                            <Box
                              component="img"
                              src={item.logo}
                              alt={item.title}
                              sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                            />
                          </Box>
                        </Tooltip>
                      ))}
                      {remaining > 0 && (
                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: 1.5,
                            bgcolor: "rgba(255,255,255,0.35)",
                            color: "#fff",
                            fontSize: 12,
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          +{remaining}
                        </Box>
                      )}
                    </Box>
                    <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: 600 }}>
                      ↗ {t("skillsHint")}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>

          <Dialog open={Boolean(openCategory)} onClose={() => setOpenCategory(null)} maxWidth="sm" fullWidth>
            <DialogTitle
              sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "primary.main", fontWeight: 700 }}
            >
              {openCategory?.category}
              <IconButton onClick={() => setOpenCategory(null)}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                {openCategory?.items.map((item, i) => (
                  <Grid item xs={4} sm={3} key={i} sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        mx: "auto",
                        bgcolor: "#f5f8fc",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 1,
                      }}
                    >
                      <Box
                        component="img"
                        src={item.logo}
                        alt={item.title}
                        sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                      />
                    </Box>
                    <Typography sx={{ fontSize: 12, fontWeight: 600, mt: 0.5 }}>{item.title}</Typography>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
          </Dialog>
        </Box>
      )}
    </div>
  );
}
