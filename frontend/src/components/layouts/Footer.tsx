import { Hash, Instagram, Twitter } from "lucide-react";

 
  const Footer = () => (
    <footer className="bg-sage-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center border-2 border-gold-400">
                <span className="text-sage-900 font-serif font-bold text-lg">E</span>
              </div>
              <span className="text-cream font-serif font-bold text-2xl tracking-wide">ELYSIAN</span>
            </div>
            <p className="text-cream/80 mb-8 font-light leading-relaxed">
              Established 1847. A legacy of uncompromising quality 
              and timeless sophistication.
            </p>
            <div className="flex space-x-6">
              <Instagram className="w-6 h-6 text-cream/60 hover:text-gold-400 cursor-pointer transition-colors" />
              <Hash className="w-6 h-6 text-cream/60 hover:text-gold-400 cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-cream/60 hover:text-gold-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {[
            { title: "Collections", links: ["Signature Series", "Heritage Line", "Seasonal", "Bespoke"] },
            { title: "Services", links: ["Personal Styling", "Size Consultation", "Alterations", "Care Guide"] },
            { title: "Company", links: ["Our Story", "Craftsmanship", "Sustainability", "Careers"] }
          ].map((section, index) => (
            <div key={index}>
              <h3 className="text-cream font-serif text-lg mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-cream/70 hover:text-gold-400 transition-colors font-light">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-cream/20 mt-16 pt-12 text-center">
          <p className="text-cream/60 font-light">
            © 2025 Elysian Heritage. All rights reserved. | Crafted with distinction since 1847.
          </p>
        </div>
      </div>
    </footer>
  );
export default Footer