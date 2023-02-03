import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useContext } from "react";
import { Context } from "./ContextComponent";
import { useTranslation } from "react-i18next";

export default function ProjectsCategories() {
  const { valueProjects, setValueProjects, inputValueProjects, setInputValueProjects } = useContext(Context);
  const [t, i18n] = useTranslation("global");
  let projectsCategories = t("categoriesProjects", { returnObjects: true });

  return (
    <div>
      <Autocomplete
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
