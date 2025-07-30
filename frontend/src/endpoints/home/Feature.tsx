import { Star, Truck, Shield, RefreshCw} from 'lucide-react';

 const Features = () => (
    <section className="py-24 bg-sage-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-serif text-cream mb-6">THE ELYSIAN PROMISE</h2>
          <div className="w-24 h-0.5 bg-gold-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: Star, title: "Artisan Craftsmanship", desc: "Hand-finished by master tailors" },
            { icon: Shield, title: "Lifetime Quality", desc: "Guaranteed for generations" },
            { icon: Truck, title: "White Glove Service", desc: "Complimentary worldwide delivery" },
            { icon: RefreshCw, title: "Heritage Guarantee", desc: "60-day satisfaction promise" }
          ].map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-500 transition-colors">
                <feature.icon className="w-8 h-8 text-sage-900" />
              </div>
              <h3 className="text-cream font-serif text-xl mb-4">{feature.title}</h3>
              <p className="text-cream/80 font-light leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
export default Features