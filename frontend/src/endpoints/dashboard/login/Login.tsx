import { useState } from "react";
import SignupChoice from "./SignupChoice";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  const [currentView, setCurrentView] = useState('login'); // or 'signup-choice'

  return currentView === 'signup-choice'
    ? <SignupChoice goBack={() => setCurrentView('login')} />
    : <LoginForm switchToSignup={() => setCurrentView('signup-choice')} />;
};

export default LoginPage;
