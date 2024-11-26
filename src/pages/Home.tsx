import React, { useState } from "react";

import "@assets/styles/layout.css"
import Card from "@components/Card";

const Home: React.FC = () => {
    const [hoveredItems, setHoveredItems] = useState<string[]>([]);

    // TODO: dummy values for testing
    // defines the projects/skills and their corresponding relationship
    const projectSkillsMapping: { [key: string]: string[] } = {
        "project 1": ["skill 1", "skill 2"],
        "project 2": ["skill 1", "skill 3", "skill 4"],
        "project 3": ["skill 5", "skill 6"],
        "project 4": ["skill 2", "skill 4", "skill 6"]
    }

    const projects = Object.keys(projectSkillsMapping);
    const skills = Array.from(new Set(Object.values(projectSkillsMapping).flat()));

    const handleHover = (item: string | null) => {
        if (!item) {
            setHoveredItems([]);
            return;
        }
        const relatedSkills = projectSkillsMapping[item] || [];
        const relatedProjects = Object.keys(projectSkillsMapping).filter(
            project => projectSkillsMapping[project].includes(item)
        );
        setHoveredItems([item, ...relatedSkills, ...relatedProjects]);
    }
    const isHovered = (item: string) => hoveredItems.includes(item);

    return (
        <div className="hero">
            <header>
                <h1>Zijie Tan</h1>
                <p>ztan4@ualberta.ca</p>
            </header>
            <section className="floating-section">
                {/* projects section */}
                <div className="projects">
                    <h2>Projects</h2>
                    <div className="card-container">
                        {projects.map((project) => (
                            <Card
                                key={project}
                                title={project}
                                onHover={() => handleHover(project)}
                                isHovered={isHovered(project)}
                            />
                        ))}
                    </div>
                </div>
                {/* skills section */}
                <div className="skills">
                    <h2>Skills</h2>
                    <div className="card-container">
                        {skills.map((skill) => (
                            <Card
                                key={skill}
                                title="skill"
                                onHover={() => handleHover(skill)}
                                isHovered={isHovered(skill)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* render dotted lines to connect project and skills */}
            <div className="connections">
                {hoveredItems.map((item, index) => (
                    <div
                        key={index}
                        className={`connected-line ${isHovered(item) ? "active" : ""}`}
                    ></div>
                ))}
            </div>
        </div>
    )
};

export default Home;