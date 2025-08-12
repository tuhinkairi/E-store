import { useState } from "react";
import { ShoppingBag, Menu, X} from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { endpoints } from "../../data/endpoints";
import { NavLink } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogin, setLogin] = useState(true)

    return (
        <header className={`fixed bg-cream/95 top-0 w-full  backdrop-blur-md z-50 border-b border-sage-200/30`}>
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
                            <NavLink
                                key={item.title}
                                to={item.link}
                                className={({ isActive }: { isActive: boolean }) =>
                                    `${isActive ? "text-gold-600" : "text-sage-800 hover:text-gold-600"} transition-colors font-medium text-sm tracking-widest`
                                }
                            >
                                {item.title}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-6">
                        {isLogin ? <button onClick={()=>navigate("/dashboard/user")} className="p-2 bg-gold-600 rounded-full hover:scale-105 cursor-pointer transform"><ShoppingBag className="w-6 h-6 text-sage-800  " /></button>:
                        <button onClick={()=>{navigate("/login")
                            setLogin(true)
                        }} className="bg-gold-600 text-sage-800 px-5 py-2 font-medium text-base hover:bg-gold-500 transition-all transform hover:scale-105 tracking-wide border-2 border-gold-600">
                            Login
                        </button>
                        }
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