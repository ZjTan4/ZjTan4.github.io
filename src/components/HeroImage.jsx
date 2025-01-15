import React from "react";
import userImage from "../assets/user.jpg";
import AnimatedIcon from "./AnimatedIcon";
import { BiLogoCss3, BiLogoReact, BiLogoTailwindCss, BiLogoTypescript } from "react-icons/bi";

const HeroImage = () => {
    return (
        <div className="mask-gradient absolute right-0 top-0 h-[550px] w-full overflow-hidden rounded-bl-full rounded-br-full border-r-[10px] border-blue-500 bg-gray-700 md:h-[600px] md:w-[450px]">
            <AnimatedIcon 
                Icon={BiLogoReact}
                className="left-10 top-24"
            />
            <AnimatedIcon 
                Icon={BiLogoCss3}
                className="right-5 top-28"
            />
            <AnimatedIcon 
                Icon={BiLogoTypescript}
                className="right-1 top-72"
            />
            <AnimatedIcon 
                Icon={BiLogoTailwindCss}
                className="left-2 top-80"
            />
            <img 
                src={userImage} 
                alt="User Image"
                className="absolute bottom-0 left-1/2 w-[450px] -translate-x-1/2"
            />
        </div>
    )
}

export default HeroImage; 