import { useState } from 'react';
import { Scissors, Ruler, Palette, Clock, MapPin, Calendar, Phone, Mail, ChevronRight, Play, Award, Star } from 'lucide-react';

const AtelierPage = () => {
  const [activeService, setActiveService] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(0);

  const services = [
    {
      title: "Bespoke Tailoring",
      price: "From $2,500",
      duration: "8-12 weeks",
      icon: Scissors,
      description: "Complete custom garments crafted to your exact measurements and preferences. From initial consultation to final fitting, experience the pinnacle of personalized luxury.",
      process: [
        "Initial consultation and design discussion",
        "Precise measurements and fabric selection",
        "Pattern creation and first fitting",
        "Multiple fittings and adjustments",
        "Final delivery and lifetime care service"
      ],
      image: "/api/placeholder/600/400"
    },
    {
      title: "Personal Styling",
      price: "From $350",
      duration: "2-4 hours",
      icon: Palette,
      description: "Expert styling consultation to curate a wardrobe that reflects your personal style and lifestyle needs. Includes wardrobe audit and shopping guidance.",
      process: [
        "Style assessment and lifestyle analysis",
        "Wardrobe audit and organization",
        "Personal shopping experience",
        "Styling session and outfit creation",
        "Ongoing style support and updates"
      ],
      image: "/api/placeholder/600/400"
    },
    {
      title: "Alterations & Tailoring",
      price: "From $85",
      duration: "1-3 weeks",
      icon: Ruler,
      description: "Expert alterations to ensure the perfect fit for your existing garments. Our master tailors can transform any piece to suit your body perfectly.",
      process: [
        "Garment assessment and consultation",
        "Precision fitting and marking",
        "Expert alteration work",
        "Quality control and finishing",
        "Final fitting and delivery"
      ],
      image: "/api/placeholder/600/400"
    },
    {
      title: "Heritage Restoration",
      price: "From $200",
      duration: "2-6 weeks",
      icon: Award,
      description: "Restore and preserve your treasured garments with our specialized heritage restoration service. We breathe new life into vintage and heirloom pieces.",
      process: [
        "Detailed garment analysis",
        "Restoration plan and quote",
        "Careful cleaning and preparation",
        "Expert restoration work",
        "Preservation and care guidance"
      ],
      image: "/api/placeholder/600/400"
    }
  ];

  const locations = [
    {
      city: "London",
      address: "42 Savile Row, Mayfair, London W1S 3PR",
      phone: "+44 20 7123 4567",
      email: "london@elysianheritage.com",
      hours: "Mon-Sat: 10AM-7PM, Sun: 12PM-5PM",
      image: "/api/placeholder/500/300",
      description: "Our flagship atelier in the heart of London's famous tailoring district.",
      specialties: ["Bespoke Tailoring", "Heritage Restoration", "Personal Styling"]
    },
    {
      city: "Paris",
      address: "15 Rue Saint-Honoré, 1st Arrondissement, 75001 Paris",
      phone: "+33 1 42 60 34 56",
      email: "paris@elysianheritage.com",
      hours: "Tue-Sat: 10AM-7PM, Mon: 2PM-7PM",
      image: "/api/placeholder/500/300",
      description: "Parisian elegance meets British craftsmanship in our boutique atelier.",
      specialties: ["Couture Services", "Personal Styling", "Alterations"]
    },
    {
      city: "New York",
      address: "789 Madison Avenue, Upper East Side, NY 10065",
      phone: "+1 212 555 0123",
      email: "newyork@elysianheritage.com",
      hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-6PM",
      image: "/api/placeholder/500/300",
      description: "Contemporary luxury in Manhattan's premier shopping district.",
      specialties: ["Bespoke Tailoring", "Personal Styling", "Corporate Services"]
    }
  ];

  const craftspeople = [
    {
      name: "Master Edward Thornfield",
      role: "Head Tailor",
      experience: "35 years",
      specialty: "Bespoke Suiting",
      image: "/api/placeholder/300/400",
      bio: "Trained on Savile Row, Edward brings decades of expertise to every garment he creates."
    },
    {
      name: "Madame Isabelle Dubois",
      role: "Couture Specialist",
      experience: "28 years",
      specialty: "Evening Wear",
      image: "/api/placeholder/300/400",
      bio: "Former atelier head at a prestigious Parisian fashion house, specializing in intricate couture work."
    },
    {
      name: "Alessandro Romano",
      role: "Master Seamster",
      experience: "22 years",
      specialty: "Italian Tailoring",
      image: "/api/placeholder/300/400",
      bio: "Brings the precision of Italian craftsmanship to our contemporary designs."
    },
    {
      name: "Sophie Mitchell",
      role: "Personal Stylist",
      experience: "15 years",
      specialty: "Wardrobe Curation",
      image: "/api/placeholder/300/400",
      bio: "Expert in translating personal style into timeless wardrobe solutions."
    }
  ];

  const testimonials = [
    {
      quote: "The bespoke experience at Elysian is unmatched. Every detail is considered, every fitting is perfect.",
      author: "Sir Richard Pemberton",
      service: "Bespoke Tailoring",
      rating: 5
    },
    {
      quote: "Sophie transformed my entire wardrobe. I finally have a style that truly reflects who I am.",
      author: "Catherine Wells",
      service: "Personal Styling",
      rating: 5
    },
    {
      quote: "They restored my grandfather's dinner jacket to its former glory. Exceptional craftsmanship.",
      author: "James Morrison",
      service: "Heritage Restoration",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Custom styles */}
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/api/placeholder/1920/1080" 
            alt="Elysian Atelier Workshop" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sage-900/95 to-sage-700/60"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-light text-cream mb-8 leading-tight animate-float">
            The Elysian
            <br />
            <span className="text-gold-400 italic">Atelier</span>
          </h1>
          <p className="text-xl md:text-2xl text-cream/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Where master craftspeople bring your vision to life through time-honored techniques and contemporary innovation. Experience bespoke luxury at its finest.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gold-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-gold-600 transition-all duration-300 transform hover:scale-105">
              Book Consultation
            </button>
            <button className="border-2 border-cream/30 text-cream px-8 py-4 rounded-lg font-medium hover:bg-cream/10 transition-all duration-300 flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Virtual Tour
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-sage-900 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              From bespoke tailoring to personal styling, discover our comprehensive range of luxury services
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Service Navigation */}
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeService === index 
                      ? 'bg-sage-800 text-cream shadow-xl' 
                      : 'bg-sage-50 hover:bg-sage-200'
                  }`}
                  onClick={() => setActiveService(index)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      activeService === index ? 'bg-gold-500' : 'bg-white'
                    }`}>
                      <service.icon className={`w-6 h-6 ${
                        activeService === index ? 'text-white' : 'text-sage-800'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium mb-1">{service.title}</h3>
                      <div className="flex items-center gap-4 text-sm opacity-80">
                        <span>{service.price}</span>
                        <span>•</span>
                        <span>{service.duration}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      activeService === index ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Service Details */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-sage-50 rounded-lg overflow-hidden">
                <img 
                  src={services[activeService].image} 
                  alt={services[activeService].title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-medium text-sage-900 mb-4">
                    {services[activeService].title}
                  </h3>
                  <p className="text-sage-700 mb-6 leading-relaxed">
                    {services[activeService].description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <h4 className="font-medium text-sage-900">Our Process:</h4>
                    {services[activeService].process.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gold-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sage-700">{step}</p>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-sage-800 text-cream px-6 py-3 rounded-lg font-medium hover:bg-sage-700 transition-colors">
                    Book This Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftspeople Section */}
      <section className="py-20 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-sage-900 mb-6">
              Master Craftspeople
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              Meet the artisans who bring decades of expertise to every piece they create
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {craftspeople.map((person, index) => (
              <div key={index} className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={person.image} 
                    alt={person.name}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-sage-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-sage-900 mb-1">{person.name}</h3>
                  <p className="text-gold-500 font-medium mb-2">{person.role}</p>
                  <div className="flex items-center gap-4 text-sm text-sage-600 mb-3">
                    <span>{person.experience}</span>
                    <span>•</span>
                    <span>{person.specialty}</span>
                  </div>
                  <p className="text-sm text-sage-700 leading-relaxed">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-sage-900 mb-6">
              Our Ateliers
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              Visit us at one of our prestigious locations around the world
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Location Navigation */}
            <div className="space-y-6">
              {locations.map((location, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedLocation === index 
                      ? 'bg-sage-800 text-cream' 
                      : 'bg-sage-50 hover:bg-sage-200'
                  }`}
                  onClick={() => setSelectedLocation(index)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-medium mb-2">{location.city}</h3>
                      <div className="space-y-2 text-sm opacity-90">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{location.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span>{location.hours}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span>{location.phone}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      selectedLocation === index ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Location Details */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-sage-50 rounded-lg overflow-hidden">
                <img 
                  src={locations[selectedLocation].image} 
                  alt={`${locations[selectedLocation].city} Atelier`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-medium text-sage-900 mb-4">
                    {locations[selectedLocation].city} Atelier
                  </h3>
                  <p className="text-sage-700 mb-6 leading-relaxed">
                    {locations[selectedLocation].description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-sage-900 mb-3">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {locations[selectedLocation].specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="flex-1 bg-sage-800 text-cream px-4 py-3 rounded-lg font-medium hover:bg-sage-700 transition-colors flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Book Visit
                    </button>
                    <button className="px-4 py-3 border-2 border-sage-800 text-sage-800 rounded-lg hover:bg-sage-800 hover:text-cream transition-colors flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-sage-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-sage-900 mb-6">
              Client Experiences
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              Hear from those who have experienced our exceptional craftsmanship and service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="text-lg text-sage-700 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-medium text-sage-900">{testimonial.author}</p>
                  <p className="text-sage-600 text-sm">{testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-sage-900 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-light text-cream mb-8">
            Begin Your Bespoke Journey
          </h2>
          <p className="text-xl text-cream/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Schedule a consultation with our master craftspeople and discover how we can create something truly exceptional for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gold-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-gold-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Book Consultation
            </button>
            <button className="border-2 border-cream/30 text-cream px-8 py-4 rounded-lg font-medium hover:bg-cream/10 transition-all duration-300 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call Us Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AtelierPage;