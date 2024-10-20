import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/page1/HomePage";
import Shop from "./components/page2/Shop";
import About from "./components/page3/About";
import Contact from "./components/page4/Contact";
import DashBoard from "./components/Dashboard/DashBoard";
import Login from "./components/Dashboard/Login";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";

function App() {

  return(
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route  path="/" element={<HomePage />}/>
        <Route key={"Shop"} path="/Shop" element={<Shop/>}/>
        <Route key={"About"} path="/About" element={<About />}/>
        <Route key={"Contact"} path="/Contact" element={<Contact />}/>
        <Route key={"Dashboard"} path="/Dashboard" element={<DashBoard />}/>
        <Route key={"Login"} path="/Login" element={<Login/>}/>
        
      </Routes>
      <Footer/>
    </BrowserRouter>
    ); 
}

export default App;
