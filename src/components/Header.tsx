import React, {useState} from "react";

import "@assets/styles/components.css"

interface HeaderProps {
    logoText: string;
    links: { name: string; href: string }[];
}

const Header: React.FC<HeaderProps> = ({ logoText, links}) => {
    return (
        <header className="header">
            <div className="container">
                <div>{logoText}</div>
                <nav>
                    {links.map((link, index) => (
                        <a key={index} href={link.href}>
                            {link.name}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;