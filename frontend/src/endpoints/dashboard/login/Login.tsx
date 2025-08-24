import { useEffect, useState } from "react";
import SignupChoice from "./SignupChoice";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { useValidateToken } from "../../../hooks/useValidateToken";

const LoginPage = () => {
  const {isValid, loading} = useValidateToken() 
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('login'); // or 'signup-choice'
  useEffect(() => {
    // console.log("login ->>>>",isValid, loading)
    if (isValid) {
      navigate("/dashboard/user");
      return
    }
  }, [isValid, navigate, loading])
  return currentView === 'signup-choice'
    ? <SignupChoice goBack={() => setCurrentView('login')} />
    : <LoginForm switchToSignup={() => setCurrentView('signup-choice')} />;
};

export default LoginPage;
