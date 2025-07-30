import { useEffect, useState } from "react";

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroImages = [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&h=800&fit=crop"
    ];
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroImages.length]);
    return (

        <section className="relative h-screen overflow-hidden">
            <div className="absolute inset-0">
                {heroImages.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-2000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img src={image} alt={`Heritage ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-sage-900/80 via-sage-800/40 to-transparent" />
                    </div>
                ))}
            </div>

            <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-cream mb-8 leading-tight">
                            TIMELESS
                            <span className="block text-gold-400 italic">
                                Elegance
                            </span>
                        </h1>
                        <p className="text-xl text-cream/90 mb-12 max-w-2xl font-light leading-relaxed">
                            Curated collections for the discerning modern gentleman and lady.
                            Where heritage craftsmanship meets contemporary sophistication.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <button className="bg-gold-600 text-sage-900 px-12 py-4 font-medium text-lg hover:bg-gold-500 transition-all transform hover:scale-105 tracking-wide border-2 border-gold-600">
                                DISCOVER COLLECTION
                            </button>
                            <button className="border-2 border-cream text-cream px-12 py-4 font-medium text-lg hover:bg-cream hover:text-sage-900 transition-all tracking-wide">
                                VIEW HERITAGE
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-4 h-4 rounded-full transition-colors border-2 ${index === currentSlide ? 'bg-gold-500 border-gold-500' : 'bg-transparent border-cream/50'
                            }`}
                    />
                ))}
            </div>
        </section>
    )
}
export default HeroSection