import React, { useEffect, useState } from "react";

import "@assets/styles/layout.css"
import { fetchCardInfos } from "@utils/api";
import { CardInfo } from "@utils/types";

const Projects : React.FC = () => {
    const [projects, setProjects] = useState<CardInfo[]>([]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data: CardInfo[] = await fetchCardInfos();
                setProjects(data.filter((cardInfo) => cardInfo.type == "project"));
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
