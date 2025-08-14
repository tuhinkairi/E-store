import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import RoutingPage from "./RoutingPage";
import ErrorPage from "./components/fallback/ErrorPage";
import { useState, useEffect } from "react";

export default function App() {
  const path = useLocation().pathname;
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setError(event.error || new Error("An unknown error occurred"));
    };

    window.addEventListener("error", handleError);
    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (error) {
    return (
      <ErrorPage
        error={error}
        onRetry={() => window.location.reload()}
        onNavigateHome={() => navigate("/")}
      />
    );
  }

  const hideLayoutPaths = [
    "/dashboard/user",
    "/dashboard",
    "/onboarding",
    "/login",
  ];

  return (
    <section>
      {!hideLayoutPaths.includes(path) && <Header />}
      <RoutingPage />
      {!hideLayoutPaths.includes(path) && <Footer />}
    </section>
  );
}
