import { ArrowRight, Award, Truck, UserCheck } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import { useNavigate } from "react-router-dom";
import { useValidateToken } from "../../../../hooks/useValidateToken";
import LoadingScreen from "../../../../components/fallback/LoadingScreen";

const WelcomeStep = ({ onNext }:{onNext:()=>void}) => {
  const {isValid, loading,userData} = useValidateToken()
  const navigate = useNavigate()
  if (isValid) {
    //console.log(userData)
    navigate("/dashboard/user")
  }
  if (loading) {
    return <LoadingScreen />
  }
  return(
  <div className="text-center space-y-8">
    <div className="space-y-4">
      <div className="w-20 h-20 bg-sage-900 rounded-full flex items-center justify-center mx-auto">
        <span className="text-3xl font-light text-cream">E</span>
      </div>
      <h1 className="text-4xl font-light text-sage-900">Welcome to Elysian</h1>
      <p className="text-lg text-sage-600 max-w-md mx-auto">
        Where timeless elegance meets contemporary sophistication. Let's create your personalized shopping experience.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
      <FeatureCard
        icon={UserCheck}
        title="Personalized"
        description="Curated recommendations just for you"
      />
      <FeatureCard
        icon={Truck}
        title="Seamless"
        description="Effortless shopping and delivery"
      />
      <FeatureCard
        icon={Award}
        title="Exclusive"
        description="Member-only benefits and early access"
      />
    </div>

    <button
      onClick={onNext}
      className="bg-sage-900 text-cream px-8 py-3 rounded-lg hover:bg-sage-800 transition-colors flex items-center mx-auto"
    >
      Get Started
      <ArrowRight className="h-5 w-5 ml-2" />
    </button>
  </div>
)};
export default WelcomeStep;