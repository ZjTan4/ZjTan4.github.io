import React, { useState } from "react";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Tape from "./sections/Tape";
import About from "./sections/About";
import Services from "./sections/Services";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const App = () => {
    const [menuOpen, setMenuOpen] = useState();

    return (
        <div className="bg-gray-900 overflow-x-clip antialiased">
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            <Hero menuOpen={menuOpen}/>
            <Tape/>
            <Projects />
            <About />
            <Services />
            <Contact />
            <Footer />
        </div>
    );
};

export default App;
