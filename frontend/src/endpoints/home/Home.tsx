import HeroSection from './HeroSection';
import FeaturedProducts from './FeaturedProduct';
import Features from './Feature';
import Newsletter from './NewsLetter';

const Home = () => {
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