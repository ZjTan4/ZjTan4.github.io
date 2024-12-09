import React, { useEffect, useState } from "react";

import "@assets/styles/layout.css"
import { fetchProjects } from "@utils/api";
import { Project } from "@utils/types";

const Projects : React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch(error:any) {
                console.error("Error fetching projects:", error);
            }
        }
        loadProjects();
    }, []);
    return (
        <div>
            <h2>Project</h2>
            <div>
                {projects.map((project) => (
                    <div>
                        {project.name}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Projects;
