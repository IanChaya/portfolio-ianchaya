import React, { createContext } from "react";

import { useTranslation } from "react-i18next";

export const Context = createContext();

export default function CartContextComponent({ children }) {

  const [t, i18n] = useTranslation("global");
  let categoriesEducation = t('categoriesEducation', { returnObjects: true });
  let categoriesProjects = t('categoriesProjects', { returnObjects: true });
  let categoriesSkills = t('categoriesSkills', { returnObjects: true });

  // const categoriesSkills = [
  //   { label: "Todas" },
  //   { label: "Programación Web" },
  //   { label: "Programación" },
  //   { label: "Microcontroladores" },
  //   { label: "Robótica" },
  //   { label: "Programación de PLC" },
  //   { label: "Modelado 3D" },
  //   { label: "Adobe" },
  //   { label: "Office" },
  // ];

  // const categoriesEducation = [{ label: "Todas" }, { label: "Principal" }, { label: "Cursos" }, { label: "Idiomas" }];

  // const categoriesProjects = [{ label: "Todos" }, { label: "Automatización" }, { label: "Programación Web" }, { label: "Universitarios" }];


  const [valueSkills, setValueSkills] = React.useState("");
  const [inputValueSkills, setInputValueSkills] = React.useState("");
  const [valueEducation, setValueEducation] = React.useState("");
  const [inputValueEducation, setInputValueEducation] = React.useState("");
  const [valueProjects, setValueProjects] = React.useState("");
  const [inputValueProjects, setInputValueProjects] = React.useState("");

  function findCategory(id) {}
  // const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  // const [totalCont, setTotalCont] = useState(0);
  // const [totalToPay, setTotalToPay] = useState(0);

  // function addToCart(item, cont) {
  //   const cartAux = [...cart];

  //   let foundInCart = false;

  //   for (let i = 0; i < cartAux.length; i++) {
  //     if (cartAux[i].id == item.id) {
  //       cartAux[i].cont = cartAux[i].cont + cont;
  //       foundInCart = true;
  //     }
  //   }
  //   if (!foundInCart) {
  //     cartAux.push({ ...item, cont });
  //   }

  //   setCart(cartAux);
  // }

  // function deleteFromCart(id) {
  //   setCart(cart.filter((item) => item.id != id));
  // }

  // function deleteAllFromCart() {
  //   setCart([]);
  // }

  // useEffect(() => {
  //   setTotalCont(cart.reduce((acc, item) => acc + item.cont, 0));
  //   setTotalToPay(cart.reduce((acc, item) => acc + item.cont * item.price, 0));
  // }, [cart]);

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

  return (
    <Context.Provider
      value={{
        findCategory,
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
        setInputValueProjects
      }}
    >
      {children}
    </Context.Provider>
  );
}
