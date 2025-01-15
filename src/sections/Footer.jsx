import React from "react";

const Footer = () => {
    return (
        <footer className="bg-white/5">
            <div className="container p-4 text-center">
                <p className="text-white/40 font-serif">
                    &copy; {new Date().getFullYear()} Zijie Tan. 
                </p>
            </div>
        </footer>
    );
};

export default Footer;