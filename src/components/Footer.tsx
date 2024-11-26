import React from "react";

import "@assets/styles/components.css"

interface FooterProps {
    socialLinks: {name: string; href: string}[];
}

const Footer: React.FC<FooterProps> = ({ socialLinks }) => {
    return (
        <footer className="footer">
            <div className="container">
                <p> {new Date().getFullYear()} Zijie Tan </p>
                <div>
                    {socialLinks.map((link, index) => (
                        <a key={index} href={link.href} target="_blank" rel="noopener noreferer">
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
