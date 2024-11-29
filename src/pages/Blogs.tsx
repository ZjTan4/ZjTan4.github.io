import React from "react";

import "@assets/styles/layout.css"
import Article from "@components/Article";

const Blogs : React.FC = () => {
    return (
        <div className="blogs">
            <div className="side-bar">
                side bar
            </div>
            <Article />
        </div>
    )
};

export default Blogs;
