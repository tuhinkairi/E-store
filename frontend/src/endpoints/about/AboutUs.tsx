import { Award, Heart, Leaf, Shield, ChevronRight, Play, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const navigate = useNavigate()
  const timelineEvents = [
    {
      year: "1947",
      title: "Foundation",
      description: "Founded by master tailor Eleanor Blackwood in post-war London, establishing the principles of timeless craftsmanship."
    },
    {
      year: "1963",
      title: "Heritage Established",
      description: "Introduced our signature Heritage Collection, defining luxury ready-to-wear for the modern gentleman and lady."
    },
    {
      year: "1987",
      title: "Global Expansion",
      description: "Opened flagship stores in Paris and New York, bringing European sophistication to discerning clientele worldwide."
    },
    {
      year: "2010",
      title: "Sustainable Innovation",
      description: "Pioneered sustainable luxury practices, introducing our eco-conscious Essential Collection."
    },
    {
      year: "2025",
      title: "Digital Renaissance",
      description: "Launched our digital-first approach while maintaining our commitment to artisanal craftsmanship."
    }
  ];

  const values = [
    {
      icon: Award,
      title: "Artisan Craftsmanship",
      description: "Every piece is meticulously crafted by master artisans who have perfected their skills over decades, ensuring unparalleled quality in every stitch."
    },
    {
      icon: Leaf,
      title: "Sustainable Luxury",
      description: "We believe true luxury respects our planet. Our commitment to sustainable practices ensures future generations can enjoy timeless elegance."
    },
    {
      icon: Heart,
      title: "Timeless Design",
      description: "Our designs transcend fleeting trends, creating pieces that remain relevant and beautiful for years to come, defining true investment dressing."
    },
    {
      icon: Shield,
      title: "Heritage Quality",
      description: "With over seven decades of expertise, we maintain the highest standards of quality, backed by our lifetime craftsmanship guarantee."
    }
  ];

  const team = [
    {
      name: "Victoria Sterling",
      role: "Creative Director",
      image: "/api/placeholder/300/400",
      bio: "With 20 years in luxury fashion, Victoria leads our design vision, ensuring each collection embodies timeless sophistication."
    },
    {
      name: "James Whitmore",
      role: "Master Craftsman",
      image: "/api/placeholder/300/400",
      bio: "Third-generation tailor James oversees our atelier, preserving traditional techniques while embracing modern innovation."
    },
    {
      name: "Sophia Chen",
      role: "Sustainability Director",
      image: "/api/placeholder/300/400",
      bio: "Leading our sustainable luxury initiatives, Sophia ensures our practices align with our values for a better tomorrow."
    }
  ];

  const testimonials = [
    {
      quote: "Elysian represents everything I value in fashion - quality, elegance, and timeless appeal. Each piece becomes a treasured part of my wardrobe.",
      author: "Margaret Ashworth",
      title: "Art Curator, London"
    },
    {
      quote: "The attention to detail is extraordinary. My Elysian pieces have become the foundation of my professional wardrobe.",
      author: "David Richardson",
      title: "Architect, New York"
    },
    {
      quote: "In a world of fast fashion, Elysian offers something rare - pieces that tell a story and stand the test of time.",
      author: "Isabella Martinez",
      title: "Museum Director, Paris"
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
            alt="Elysian Heritage" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sage-900/95 via-sage-800/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="animate-float">
            <h1 className="text-5xl md:text-7xl font-light text-cream mb-8 leading-tight">
              Heritage Crafted
              <br />
              <span className="text-gold-400 italic">Since 1947</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-cream/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            For over seven decades, we have devoted ourselves to creating garments that embody the perfect marriage of traditional craftsmanship and contemporary sophistication.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gold-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-gold-600 transition-all duration-300 transform hover:scale-105">
              Discover Our Story
            </button>
            <button className="border-2 border-cream/30 text-cream px-8 py-4 rounded-lg font-medium hover:bg-cream/10 transition-all duration-300 flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Watch Our Journey
            </button>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-sage-900 mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-sage-700 leading-relaxed">
                <p>
                  Born from a vision of timeless elegance, Elysian began in the cobblestone streets of post-war London. Our founder, Eleanor Blackwood, believed that true luxury lies not in ostentation, but in the quiet confidence of impeccable craftsmanship.
                </p>
                <p>
                  What started as a small atelier has grown into a global symbol of refined taste, yet our core philosophy remains unchanged: every garment should be a masterpiece that transcends seasons and trends.
                </p>
                <p>
                  Today, we continue to honor this legacy while embracing innovation, ensuring that each piece we create carries forward the spirit of timeless sophistication that defines the Elysian name.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/api/placeholder/600/700" 
                alt="Eleanor Blackwood's original atelier" 
                className="w-full rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-gold-500 text-white p-6 rounded-lg shadow-xl">
                <p className="text-2xl font-bold">78</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-sage-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-sage-900 mb-6">
              Our Journey Through Time
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              Milestones that have shaped our commitment to timeless elegance and exceptional craftsmanship
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gold-400 transform md:-translate-x-px"></div>
            
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div 
                  key={index}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="text-gold-500 text-3xl font-light mb-2">{event.year}</div>
                      <h3 className="text-2xl font-medium text-sage-900 mb-4">{event.title}</h3>
                      <p className="text-sage-700 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-8 h-8 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-sage-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              The principles that guide every decision we make and every garment we create
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group bg-sage-50 p-8 rounded-lg hover:bg-sage-100 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gold-500 rounded-lg flex items-center justify-center group-hover:bg-gold-600 transition-colors duration-300">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-sage-900 mb-4 group-hover:text-sage-800 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-sage-700 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-sage-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-sage-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              The passionate individuals who bring our vision of timeless elegance to life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-sage-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-medium text-sage-900 mb-2">{member.name}</h3>
                <p className="text-gold-500 font-medium mb-4">{member.role}</p>
                <p className="text-sage-700 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-sage-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              The voices of those who have experienced our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-sage-50 p-8 rounded-lg relative">
                <Quote className="w-12 h-12 text-gold-400 mb-6" />
                <p className="text-lg text-sage-700 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-medium text-sage-900">{testimonial.author}</p>
                  <p className="text-sage-600 text-sm">{testimonial.title}</p>
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
            Join Our Legacy
          </h2>
          <p className="text-xl text-cream/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover pieces that will become treasured parts of your wardrobe, crafted with the same dedication to excellence that has defined us for over seven decades.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={()=>navigate("/collections")} className="bg-gold-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-gold-600 transition-all duration-300 transform hover:scale-105">
              Explore Collections
            </button>
            <button onClick={()=>navigate("/atelier")} className="border-2 border-cream/30 text-cream px-8 py-4 rounded-lg font-medium hover:bg-cream/10 transition-all duration-300 flex items-center justify-center gap-2">
              Visit Our Atelier
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;