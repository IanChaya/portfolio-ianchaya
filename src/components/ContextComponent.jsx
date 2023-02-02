import React, { createContext } from "react";

import { useTranslation } from "react-i18next";

export const Context = createContext();

export default function CartContextComponent({ children }) {
  const [t, i18n] = useTranslation("global");
  let categoriesEducation = t("categoriesEducation", { returnObjects: true });
  let categoriesProjects = t("categoriesProjects", { returnObjects: true });
  let categoriesSkills = t("categoriesSkills", { returnObjects: true });

  const [valueSkills, setValueSkills] = React.useState("");
  const [inputValueSkills, setInputValueSkills] = React.useState("");
  const [valueEducation, setValueEducation] = React.useState("");
  const [inputValueEducation, setInputValueEducation] = React.useState("");
  const [valueProjects, setValueProjects] = React.useState("");
  const [inputValueProjects, setInputValueProjects] = React.useState("");

  return (
    <Context.Provider
      value={{
        categoriesSkills,
        valueSkills,
        setValueSkills,
        inputValueSkills,
        setInputValueSkills,
        categoriesEducation,
        valueEducation,
        setValueEducation,
        inputValueEducation,
        setInputValueEducation,
        categoriesProjects,
        valueProjects,
        setValueProjects,
        inputValueProjects,
        setInputValueProjects,
      }}
    >
      {children}
    </Context.Provider>
  );
}
