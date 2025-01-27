import React from "react";
import SectionTitle from "../components/SectionTitle";
import userImage from "../assets/user.jpg";
import Button from "../components/Button";

import { motion } from "framer-motion";

const About = () => {
    return (
        <section className="py-16" id="about">
            <SectionTitle title="About Me" />
            <div className="mt-8 flex flex-col items-center gap-10 md:mt-16 md:flex-row md:gap-3">
                {/* about image */}
                <img src={userImage} alt="About Image" className="w-full flex md:w-1/2"/>

                {/* about content */}
                <div className="container flex-1">
                    <div className="max-w-lg">
                        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white/80">
                            Hi, I am <span className="text-blue-500">Zijie Tan</span>
                        </h1>
                        <p className="mt-3 text-sm text-white/60 md:text-base">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.                        
                        </p>
                    </div>
                    <div>
                        <Button className="mt-5">Hire Me</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;