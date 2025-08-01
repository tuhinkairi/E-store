import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import RoutingPage from "./RoutingPage";
import ErrorPage from "./components/fallback/ErrorPage";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/fallback/LoadingScreen";

export default function App() {
  const path = useLocation().pathname
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate();
  useEffect(() => {
    try {
      
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 5000);
    } catch (error) {
      setError(error as Error)
    }
  }, [error, navigate])


  if (loading) {
    return (
      <LoadingScreen
        size="medium"
      />
    );
  }
  if (error) {
    return (
      <ErrorPage
        error={error}
        onRetry={() => window.location.reload()}
        onNavigateHome={() => navigate('/')}
      />
    );

  }
  return (
    <section>
      {!["/dashboard/user", "/dashboard", "/onboarding", "/login"].includes(path) && <Header />}
      <RoutingPage />
      {!["/dashboard/user","/dashboard", "/onboarding", "/login"].includes(path) && <Footer />}
    </section>
  )
}
