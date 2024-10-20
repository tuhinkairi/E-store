import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/page1/HomePage";
import Shop from "./components/page2/Shop";
import About from "./components/page3/About";
import Contact from "./components/page4/Contact";
import DashBoard from "./components/Dashboard/DashBoard";
import Login from "./components/Dashboard/Login";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Profile from "./components/Dashboard/ExpandedDetails/Profile";
import Order from "./components/Dashboard/ExpandedDetails/Order";
import Payment from "./components/Dashboard/ExpandedDetails/Payment";
import Wishlist from "./components/Dashboard/ExpandedDetails/Wishlist";

function App() {

  return(
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route  path="/" element={<HomePage />}/>
        <Route key={"Shop"} path="/Shop" element={<Shop/>}/>
        <Route key={"About"} path="/About" element={<About />}/>
        <Route key={"Contact"} path="/Contact" element={<Contact />}/>
        <Route key={"Dashboard"} path="/Dashboard" element={<DashBoard />}>
          <Route path="profile" element={<Profile/>}/>
          <Route path="order" element={<Order/>}/>
          <Route path="payment" element={<Payment/>}/>
          <Route path="wishlist" element={<Wishlist/>}/>
        </Route>
        <Route key={"Login"} path="/Login" element={<Login/>}/>
        
      </Routes>
      <Footer/>
      
    </BrowserRouter>
    ); 
}

export default App;
