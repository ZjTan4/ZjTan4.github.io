import React from "react";
import ReactDom from "react-dom/client";

import router from "@routes/routes";
import "@assets/styles/global.css";
import { RouterProvider } from "react-router-dom";

const root = ReactDom.createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);