import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useContext } from "react";
import { Context } from "./ContextComponent";

import { useTranslation } from "react-i18next";

export default function EducationCategories() {
  let { categoriesEducation, valueEducation, setValueEducation, inputValueEducation, setInputValueEducation } =
  
  useContext(Context);

  const [t, i18n] = useTranslation("global");
  let educationsCategories = t("categoriesEducation", { returnObjects: true });

  return (
    <div>
      <Autocomplete
        value={valueEducation}
        defaultValue= {"Testeando"}
        onChange={(event, newValueEducation) => {
          setValueEducation(newValueEducation);
        }}
        inputValue={inputValueEducation}
        onInputChange={(event, newInputValueEducation) => {
          setInputValueEducation(newInputValueEducation);
        }}
        id="controllable-states-demo"
        options={educationsCategories}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={t("categories.label")} />}
        disableClearable
      />
    </div>
  );
}
