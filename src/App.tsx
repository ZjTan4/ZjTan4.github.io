import React from "react";
import { Outlet } from "react-router-dom";

import Header from "@components/Header";
import Footer from "@components/Footer";
import Viewbox from "@components/Viewbox";

const App: React.FC = () => {
    return (
        <div>
            <Header 
                logoText="ZjTan4"
                links={[
                    {name: "Home", href: "/"},
                    {name: "About", href: "/about"},
                    {name: "Blogs", href: "/blogs"},
                    {name: "Projects", href: "/projects"},
                    // {name: "Contacts", href: "#contacts"},
                ]}
            />
            <Viewbox>
                <main className="content">
                    <Outlet></Outlet>                
                </main>
                <Footer 
                    socialLinks={[
                        {name: "Github", href: ""},
                        {name: "LinkedIn", href: ""},
                    ]}
                />
            </Viewbox>
        </div>
    );
};

export default App;