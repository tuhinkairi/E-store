import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./components/page1/HomePage";
import Shop from "./components/page2/Shop";
import About from "./components/page3/About";
import Contact from "./components/page4/Contact";
import DashBoard from "./components/Dashboard/DashBoard";
import Login from "./components/Dashboard/Uidash/Login";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Profile from "./components/Dashboard/ExpandedDetails/Profile";
import Order from "./components/Dashboard/ExpandedDetails/Order";
import Payment from "./components/Dashboard/ExpandedDetails/Payment";
import Wishlist from "./components/Dashboard/ExpandedDetails/Wishlist";
import Register from "./components/Dashboard/Uidash/Register";
import DashboardHome from "./components/Dashboard/dashboard/DashboardHome";
import AuthForm from "./components/Dashboard/AuthForm";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  return (
    <>
      {!path.includes("authentication") && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route key={"Shop"} path="/shop" element={<Shop />} />
        <Route key={"About"} path="/about" element={<About />} />
        <Route key={"Contact"} path="/contact" element={<Contact />} />
        <Route key={"Dashboard"} path="/dashboard" element={<DashBoard />}>
          <Route path="" element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="order" element={<Order />} />
          <Route path="payment" element={<Payment />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
        <Route key={"auth"} path="/authentication" element={<AuthForm/>}>
          <Route key={"Login"} path="" element={<Login />} />
          <Route key={"Register"} path="Register" element={<Register />} />
        </Route>
      </Routes>
      {!path.includes("authentication") && <Footer />}
    </>
  );
}

export default App;
