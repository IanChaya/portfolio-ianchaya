import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "./ContextComponent";

// Switch back to "dropdown" any time to restore the old Autocomplete select — nothing deleted below.
const CATEGORY_FILTER_STYLE = "chips"; // "chips" | "dropdown"

// Same colors as the bento tiles in Skills.jsx (BENTO_GRADIENTS), index-aligned to categoriesSkills.
const CATEGORY_COLORS = ["#0069cc", "#ff7a3d", "#0f9d58", "#6c5ce7", "#00b8d9", "#e84393", "#2d3436"];

export default function SkillsCategories() {
  const { valueSkills, setValueSkills, inputValueSkills, setInputValueSkills } = useContext(Context);
  const [t, i18n] = useTranslation("global");

  let skillsCategories = t('categoriesSkills', { returnObjects: true });
  const currentLabel = valueSkills && valueSkills.label;

  if (CATEGORY_FILTER_STYLE === "dropdown") {
    return (
      <div>
        <Autocomplete
          size="small"
          value={valueSkills}
          onChange={(event, newValue) => {
            setValueSkills(newValue);
          }}
          inputValue={inputValueSkills}
          onInputChange={(event, newInputValueSkills) => {
            setInputValueSkills(newInputValueSkills);
          }}
          id="controllable-states-demo"
          options={skillsCategories}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label={t("categories.label")} />}
          disableClearable
        />
      </div>
    );
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
      {skillsCategories.map((cat, i) => {
        const isActive = currentLabel ? currentLabel === cat.label : i === 0;
        const color = i === 0 ? "#0069cc" : CATEGORY_COLORS[(i - 1) % CATEGORY_COLORS.length];
        return (
          <Chip
            key={cat.label}
            label={cat.label}
            size="small"
            onClick={() => setValueSkills(cat)}
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
