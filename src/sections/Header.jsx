import React from "react";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { menuItems } from "../constants";
import Button from "../components/Button";
import MobileMenu from "../components/MobileMenu";
import Logo from "../components/Logo";
import {motion} from "framer-motion"

const Header = ({menuOpen, setMenuOpen}) => {
    return (
        <>
            <header className="fixed top-0 z-10 w-full px-4 py-4">
                <nav className="container flex items-center justify-between rounded-full border-2 border-white/10 bg-white/5 p-2 backdrop-blur">
                    <div className="flex items-center">
                        <Logo/>
                    </div>
                    
                    <ul className="hidden md:flex space-x-4">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <a 
                                    href={item.href}
                                    className="nav-item"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="hidden md:block">
                        <Button variant="outline">Contact Me</Button>
                    </div>
                    
                    {/* menu icon */}
                    <button 
                        className="text-4xl text-white md:hidden" 
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <BiX /> : <BiMenuAltRight />}
                    </button>
                </nav>
            </header>
            
            {/* Overlay for mobile menu */}
            {menuOpen && (
                <div 
                    className="fixed inset-0 z-20 bg-black opacity-50"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close Menu"
                />
            )}

            {/* Mobile Menu */}
            <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} menuItems={menuItems}/>
        </>
    );
};

export default Header;