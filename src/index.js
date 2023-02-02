import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";
import global_fr from "./translations/fr/global.json";

i18next.init({
  interpolation: { escapeValue: false},
  // lng: "es",
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
    fr: {
      global: global_fr,
    },
  },
  lng: localStorage.getItem("lng") || "es",
});

// i18next.use(initReactI18next).init({
// 	resources: {
// 		es: {
// 			translation: global_es,
// 		},
// 		en: {
// 			translation: global_en,
// 		},
//     fr: {
// 			translation: global_fr,
// 		},
// 	},
// 	lng: localStorage.getItem("lng") || "global_es",
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <I18nextProvider i18n = {i18next}>
      <App />
  </I18nextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
