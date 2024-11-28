import React, { useState, useEffect, useRef } from "react";

import "@assets/styles/layout.css"
import Card from "@components/Card";

const Home: React.FC = () => {
    const [hoveredItems, setHoveredItems] = useState<string[]>([]);
    const svgRef = useRef<SVGSVGElement>(null); // drawing connecting lines
    const itemRefs = useRef<Record<string, HTMLElement | null>>({}); // reference of project/skill cards

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
    const drawLines = () => {
        // draw lines with svg
        const svg = svgRef.current;
        if(!svg) return;
        svg.innerHTML = ""; // clear svg

        const drawLineBetweenCards = (from: HTMLElement | null, to: HTMLElement | null) => {
            if (!from || !to) return;
            const fromRect = from.getBoundingClientRect();
            const toRect = to.getBoundingClientRect();
            // fetch coordinates
            const fromX = fromRect.left + fromRect.width / 2;
            const fromY = fromRect.top + fromRect.height / 2;
            const toX = toRect.left + toRect.width / 2;
            const toY = toRect.top + fromRect.height / 2;

            // create line
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", fromX.toString());
            line.setAttribute("y1", fromY.toString());
            line.setAttribute("x2", toX.toString());
            line.setAttribute("y2", toY.toString());
            line.setAttribute("stroke", "black");
            line.setAttribute("stroke-dasharray", "4");
            line.setAttribute("stroke-width", "1");
            svg.appendChild(line);
        }
        if(hoveredItems.length > 1) {
            const [fromItem, ...toItems] = hoveredItems;
            toItems.forEach((toItem) => {
                const fromCard = itemRefs.current[fromItem];
                const toCard = itemRefs.current[toItem];
                drawLineBetweenCards(fromCard, toCard);
            });
        }
    }

    useEffect(() => {
        drawLines();
        return () => {
            if(svgRef.current) svgRef.current.innerHTML = "";
        };
    }, [hoveredItems]);

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
                    <div className="project-cards">
                        {projects.map((project) => (
                            <Card
                                key={project}
                                title={project}
                                onHover={() => handleHover(project)}
                                onHoverEnd={() => setHoveredItems([])}
                                onCardRef={(el) => (itemRefs.current[project] = el)}
                                isHovered={isHovered(project)}
                            />
                        ))}
                    </div>
                </div>
                {/* skills section */}
                <div className="skills">
                    <h2>Skills</h2>
                    <div className="skill-cards">
                        {skills.map((skill) => (
                            <Card
                                key={skill}
                                title={skill}
                                onHover={() => handleHover(skill)}
                                onHoverEnd={() => setHoveredItems([])}
                                onCardRef={(el) => (itemRefs.current[skill] = el)}
                                isHovered={isHovered(skill)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* render dotted lines to connect project and skills */}
            <svg ref={svgRef} className="svg-lines" />
        </div>
    )
};

export default Home;