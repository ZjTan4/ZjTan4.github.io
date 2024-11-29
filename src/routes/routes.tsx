import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "@pages/Home";
import About from "@pages/About";
import NotFound from "@pages/NotFound";
import Blogs from "@pages/Blogs";
import Projects from "@pages/Projects";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: "about", element: <About /> },
            { path: "blogs", element: <Blogs /> },
            { path: "projects", element: <Projects /> },
        ]
    },
    {
        path: "*", 
        element: <NotFound />
    },
]);

export default router;