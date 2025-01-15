import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({children, variant="primary", className}) => {
    const variants = {
        primary: "bg-blue-400 text-white/90 border-none hover:bg-blue-700",
        outline: "bg-transparent text-blue-300 border-2 border-blue-300 hover:bg-blue-500 hover:text-white",
    };
    return (
        <button
            className={twMerge(
                `rounded-full px-6 py-2 font-semibold ${variants[variant]}`,
                className
            )}
        >
            {children}
        </button>
    );
};

export default Button;