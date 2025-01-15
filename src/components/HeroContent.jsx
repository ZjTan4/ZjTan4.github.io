import React from "react";
import Button from "./Button";

const HeroContent = () => {
    return (
        <div className="text-left md:max-w-72 lg:max-w-lg">
            <p className="text-xl font-medium text-blue-300">
                Zijie Tan [TODO: Website WIP]
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-wide text-white/80 md:text-4xl lg:mt-8 lg:text-5xl">
                Software Developer
            </h2>

            <p className="mt-4 text-white/40 md:text-lg">
                To be a software developer is so amazing. Lorem 
                ipsum dolor sit amet, 
                consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua 
            </p>

            <div className="flex items-center gap-2 mt-5">
                <Button>
                    Hire Me
                </Button>
                
                <Button variant="outline">
                    Get CV
                </Button>
            </div>
        </div>
    )
}

export default HeroContent;