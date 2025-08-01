import { useLocation } from "react-router-dom";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import RoutingPage from "./RoutingPage";

export default function App() {
  const path = useLocation().pathname
  return (
    <section>
      {!["/dashboard/user","/onboarding","/login"].includes(path) && <Header/>}
      <RoutingPage />
      {!["/dashboard/user","/onboarding","/login"].includes(path)&&<Footer/>}
    </section>
  )
}
