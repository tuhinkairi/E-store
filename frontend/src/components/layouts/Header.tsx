import { useState } from "react";
import { ShoppingBag, Menu, X} from 'lucide-react';


const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 w-full bg-cream/95 backdrop-blur-md z-50 border-b border-sage-200/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-sage-800 rounded-full flex items-center justify-center border-2 border-gold-400">
                            <span className="text-cream font-serif font-bold text-lg">E</span>
                        </div>
                        <span className="text-sage-900 font-serif font-bold text-2xl tracking-wide">ELYSIAN</span>
                    </div>

                    <nav className="hidden md:flex space-x-12">
                        {['COLLECTIONS', 'HERITAGE', 'ATELIER', 'CONTACT'].map((item) => (
                            <a key={item} href="#" className="text-sage-800 hover:text-gold-600 transition-colors font-medium text-sm tracking-widest">
                                {item}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-6">
                        <ShoppingBag className="w-6 h-6 text-sage-800 hover:text-gold-600 cursor-pointer transition-colors" />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-sage-800"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-cream border-t border-sage-200/30">
                    <div className="px-4 py-4 space-y-3">
                        {['COLLECTIONS', 'HERITAGE', 'ATELIER', 'CONTACT'].map((item) => (
                            <a key={item} href="#" className="block text-sage-800 hover:text-gold-600 py-3 text-sm tracking-widest">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    )
}
export default Header;