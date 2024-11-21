import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./assets/styles/global.css"

const container = document.getElementById("root");

if (container) {
    createRoot(container).render(
        <React.StrictMode>
            <BrowserRouter>
            {/* <TODO></TODO> */}
            </BrowserRouter>
        </React.StrictMode>
    );
}
