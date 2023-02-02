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
          <Route path="/portfolio-ianchaya/" element={<Home />} />
          <Route path="/portfolio-ianchaya/Education" element={<Education />} />
          <Route path="/portfolio-ianchaya/Education/:idEd" element={<EducationDetail />} />
          <Route path="/portfolio-ianchaya/Experiences" element={<Experiences />} />
          <Route path="/portfolio-ianchaya/Experiences/:idExp" element={<ExperiencesDetail />} />
          <Route path="/portfolio-ianchaya/Projects" element={<Projects />} />
          <Route path="/portfolio-ianchaya/Projects/:idProj" element={<ProjectsDetail />} />
          <Route path="/portfolio-ianchaya/Skills" element={<Skills />} />
          <Route path="/portfolio-ianchaya/Contact" element={<Contact />} />
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
