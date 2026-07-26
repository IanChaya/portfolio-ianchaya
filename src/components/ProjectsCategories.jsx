import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useContext } from "react";
import { Context } from "./ContextComponent";
import { useTranslation } from "react-i18next";

// Switch back to "dropdown" any time to restore the old Autocomplete select — nothing deleted below.
const CATEGORY_FILTER_STYLE = "chips"; // "chips" | "dropdown"

// One color per category (index matches categoriesProjects order, after "All"): College, Automation.
// Automation reuses the site's brand blue (also used for "Industrial Automation" in Skills); College gets a distinct purple.
const CATEGORY_COLORS = ["#6c5ce7", "#0069cc"];

export default function ProjectsCategories() {
  const { valueProjects, setValueProjects, inputValueProjects, setInputValueProjects } = useContext(Context);
  const [t, i18n] = useTranslation("global");
  let projectsCategories = t("categoriesProjects", { returnObjects: true });
  const currentLabel = valueProjects && valueProjects.label;

  if (CATEGORY_FILTER_STYLE === "dropdown") {
    return (
      <div>
        <Autocomplete
          size="small"
          value={valueProjects}
          onChange={(event, newValueProjects) => {
            setValueProjects(newValueProjects);
          }}
          inputValue={inputValueProjects}
          onInputChange={(event, newInputValueProjects) => {
            setInputValueProjects(newInputValueProjects);
          }}
          id="controllable-states-demo"
          options={projectsCategories}
          sx={{ width: "16rem" }}
          renderInput={(params) => <TextField {...params} label={t("categories.label")} />}
          disableClearable
        />
      </div>
    );
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
      {projectsCategories.map((cat, i) => {
        const isActive = currentLabel ? currentLabel === cat.label : i === 0;
        const color = i === 0 ? "#0069cc" : CATEGORY_COLORS[(i - 1) % CATEGORY_COLORS.length];
        return (
          <Chip
            key={cat.label}
            label={cat.label}
            size="small"
            onClick={() => setValueProjects(cat)}
            sx={{
              bgcolor: isActive ? color : "#fff",
              color: isActive ? "#fff" : color,
              border: "1.5px solid",
              borderColor: color,
              fontWeight: 600,
              "&:hover": { bgcolor: isActive ? color : `${color}1a` },
            }}
          />
        );
      })}
    </Box>
  );
}
