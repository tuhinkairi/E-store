import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/page1/HomePage";
import Shop from "./components/page2/Shop";
import About from "./components/page3/About";
import Contact from "./components/page4/Contact";
import DashBoard from "./components/page5/DashBoard";
import Login from "./components/page5/Login";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";

function App() {

  return(
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route id="Home" path="/" element={<HomePage />}/>
        <Route id="Shop" path="/Shop" element={<Shop/>}/>
        <Route id="About" path="/About" element={<About />}/>
        <Route id="Contact" path="/Contact" element={<Contact />}/>
        <Route id="Dashboard" path="/Dashboard" element={<DashBoard />}/>
        <Route id="Login" path="/Login" element={<Login/>}/>
        
      </Routes>
      <Footer/>
    </BrowserRouter>
    ); 
}

export default App;
