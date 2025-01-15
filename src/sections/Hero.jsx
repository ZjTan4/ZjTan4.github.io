import React from "react";
import HeroContent from "../components/HeroContent";
import HeroImage from "../components/HeroImage";

const Hero = ({menuOpen}) => {
    return (
        <section className="overflow-hidden" id="#">
            <div className={`container transition-all duration-300 ${
                menuOpen ? "px-10 blur-sm" : ""
            }`}>
                <div className="relative flex h-screen flex-col-reverse items-center md:flex-row">
                    {/* Hero Content */}
                    <HeroContent />

                    {/* Hero Image */}
                    <HeroImage />
                </div>
            </div>
        </section>
    )
}

export default Hero;