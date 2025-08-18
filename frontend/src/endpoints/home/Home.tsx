import HeroSection from './HeroSection';
import FeaturedProducts from './FeaturedProduct';
import Features from './Feature';
import Newsletter from './NewsLetter';
import { useValidateToken } from '../../hooks/useValidateToken';
import LoadingScreen from '../../components/fallback/LoadingScreen';

const Home = () => {
  const {loading} = useValidateToken()
  if (loading) {
    return <LoadingScreen/>
  }
  return (
    <div className="min-h-screen bg-cream">
      <HeroSection />
      <FeaturedProducts />
      <Features />
      <Newsletter />
    </div>
  );
};

export default Home;