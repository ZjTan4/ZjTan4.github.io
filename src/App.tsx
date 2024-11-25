import React from "react";

import Header from "@components/Header";
import Footer from "@components/Footer";

const App: React.FC = () => {
    return (
        <div>
            <Header 
                logoText="ZjTan4"
                links={[
                    {name: "About", href: "#about"},
                    {name: "Projects", href: "#projects"},
                    {name: "Contacts", href: "#contacts"},
                ]}
            />
            <Footer 
                socialLinks={[
                    {name: "Github", href: ""},
                    {name: "LinkedIn", href: ""},
                ]}
            />
        </div>
    );
};

export default App;