import React from "react";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { menuItems } from "../constants";
import Button from "../components/Button";
import MobileMenu from "../components/MobileMenu";
import Logo from "../components/Logo";
import {motion} from "framer-motion"

const Header = ({menuOpen, setMenuOpen}) => {
    const logoVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
    };
    const navVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, ease: "easeOut" } },
    };
    const navItemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <>
            <header className="fixed top-0 z-10 w-full px-4 py-4">
                <nav className="container flex items-center justify-between rounded-full border-2 border-white/10 bg-white/5 p-2 backdrop-blur">
                    <motion.div 
                        className="flex items-center"
                        variants={logoVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Logo/>
                    </motion.div>
                    
                    <motion.ul 
                        className="hidden md:flex space-x-4"
                        variants={navVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {menuItems.map((item, index) => (
                            <motion.li 
                                key={index}
                                variants={navItemVariants}
                            >
                                <a 
                                    href={item.href}
                                    className="nav-item"
                                >
                                    {item.label}
                                </a>
                            </motion.li>
                        ))}
                    </motion.ul>

                    <motion.div 
                        className="hidden md:block"
                        variants={logoVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Button variant="outline">Contact Me</Button>
                    </motion.div>
                    
                    {/* menu icon */}
                    <motion.button 
                        className="text-4xl text-white md:hidden" 
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                        variants={logoVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {menuOpen ? <BiX /> : <BiMenuAltRight />}
                    </motion.button>
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