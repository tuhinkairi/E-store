import { useState } from "react";
import { ShoppingBag, Menu, X} from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

const endpoints:{title:string, link:string}[] = [
    {
        title:"HOME",
        link:"/"
    },
    {
        title:"COLLECTIONS",
        link:"/collections"
    },
    {
        title:"ATELIER",
        link:"/atelier"
    },
    {
        title:"ABOUT US",
        link:"/about-us"
    },
    {
        title:"CONTACT",
        link:"/contact-us"
    }
]
const Header = () => {
    const path = useLocation().pathname
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className={`${path=="/collections" ? "bg-cream/95":"fixed"} top-0 w-full  backdrop-blur-md z-50 border-b border-sage-200/30`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-sage-800 rounded-full flex items-center justify-center border-2 border-gold-400">
                            <span className="text-cream font-serif font-bold text-lg">E</span>
                        </div>
                        <span className="text-sage-900 font-serif font-bold text-2xl tracking-wide">ELYSIAN</span>
                    </div>

                    <nav className="hidden md:flex space-x-12">
                        {endpoints.map((item) => (
                            <a key={item.title} href={item.link} className="text-sage-800 hover:text-gold-600 transition-colors font-medium text-sm tracking-widest">
                                {item.title}
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
                        {endpoints.map((item) => (
                            <Link key={item.title} to={item.link} className="block text-sage-800 hover:text-gold-600 py-3 text-sm tracking-widest">
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    )
}
export default Header;