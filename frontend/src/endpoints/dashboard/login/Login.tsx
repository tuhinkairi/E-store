import { useEffect, useState } from "react";
import SignupChoice from "./SignupChoice";
import LoginForm from "./LoginForm";
import { useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../store/features/GlobalSlice";

const LoginPage = () => {
  const isLoggedIn = useAppSelector(s=>s.user?.isLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    dispatch(setLoading(true))
    if (isLoggedIn) {
      navigate("/dashboard/user")
      dispatch(setLoading(false))
    }
  },[isLoggedIn, navigate,dispatch])
  const [currentView, setCurrentView] = useState('login'); // or 'signup-choice'

  return currentView === 'signup-choice'
    ? <SignupChoice goBack={() => setCurrentView('login')} />
    : <LoginForm switchToSignup={() => setCurrentView('signup-choice')} />;
};

export default LoginPage;
