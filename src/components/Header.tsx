import React, {useState} from "react";

interface HeaderProps {
    logoText: string;
    links: { name: string; href: string }[];
}

const Header: React.FC<HeaderProps> = ({ logoText, links}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="container flex-between">
                <div className="logo">{logoText}</div>
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
} ;

export default Header;