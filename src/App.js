import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Education from "./components/Education";
import EducationDetail from "./components/EducationDetail";
import Experiences from "./components/Experiences";
import ExperiencesDetail from "./components/ExperiencesDetail";
import Skills from "./components/Skills";
import ContextComponent from "./components/ContextComponent";
import Projects from "./components/Projects";
import ProjectsDetail from "./components/ProjectsDetail"
import Contact from "./components/Contact";

function App() {
  return (
    <ContextComponent>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/portfolio-ianchaya" element={<Home />} />
          <Route path="/Education" element={<Education />} />
          <Route path="/Education/:idEd" element={<EducationDetail />} />
          <Route path="/Experiences" element={<Experiences />} />
          <Route path="/Experiences/:idExp" element={<ExperiencesDetail />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Projects/:idProj" element={<ProjectsDetail />} />
          <Route path="/Skills" element={<Skills />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ContextComponent>

    // <CartContextComponent>
    //   <BrowserRouter>
    //     <Navbar />
    //     <Routes>
    //       <Route path="/" element={<ItemListContainer />} />
    //       <Route path="/category/:idCategory" element={<ItemListContainer />} />
    //       <Route path="/item/:iditem" element={<ItemDetailContainer />} />
    //       <Route path="/checkout" element={<Checkout />} />
    //       <Route path="/cart" element={<Cart />} />
    //     </Routes>
    //     <Footer />
    //   </BrowserRouter>
    // </CartContextComponent>
  );
}

export default App;
