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

        const createLine = (x1: number, y1: number, x2: number, y2: number) => {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x1.toString());
            line.setAttribute("y1", y1.toString());
            line.setAttribute("x2", x2.toString());
            line.setAttribute("y2", y2.toString());
            line.setAttribute("stroke", "black");
            line.setAttribute("stroke-dasharray", "4");
            line.setAttribute("stroke-width", "1");
            return line;
        }

        const drawLineBetweenCards = (from: HTMLElement | null, to: HTMLElement | null) => {
            if (!from || !to) return;
            const svgRect = svgRef.current!.getBoundingClientRect();
            const fromRect = from.getBoundingClientRect();
            const toRect = to.getBoundingClientRect();
            const upperContainer = fromRect.y < toRect.y ? from.parentElement : to.parentElement;
            const lowerContainer = fromRect.y >= toRect.y ? from.parentElement : to.parentElement;
            
            // compute coordinates
            // since the svg is embeded in Home instead of the whole page
            // , add offset to correct the coordinate system
            const fromX = fromRect.x + (fromRect.width / 2) - svgRect.x;
            const fromY = fromRect.y < toRect.y ? fromRect.bottom - svgRect.y : fromRect.top - svgRect.y;
            const toX = toRect.x + (toRect.width / 2) - svgRect.x;
            const toY = fromRect.y >= toRect.y ? toRect.bottom - svgRect.y : toRect.top - svgRect.y;
            // mid-line for alignment
            const middleY = (upperContainer!.getBoundingClientRect().bottom + lowerContainer!.getBoundingClientRect().top) / 2 - svgRect.y;

            // Add line segments
            svg.appendChild(createLine(fromX, fromY, fromX, middleY)); // Vertical line from "from" card
            svg.appendChild(createLine(fromX, middleY, toX, middleY)); // Horizontal line connecting midpoints
            svg.appendChild(createLine(toX, middleY, toX, toY)); // Vertical line to "to" card
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
                    <div className="floating-card-container">
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
                    <div className="floating-card-container">
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