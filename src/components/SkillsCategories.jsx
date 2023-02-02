import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "./ContextComponent";

export default function SkillsCategories() {
  const { valueSkills, setValueSkills, inputValueSkills, setInputValueSkills } = useContext(Context);
  const [t, i18n] = useTranslation("global");
  
  let skillsCategories = t('categoriesSkills', { returnObjects: true });
  
  return (
    <div>
      <Autocomplete
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
