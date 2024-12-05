import React, { useState, useEffect, useRef } from "react";

import "@assets/styles/layout.css"
import Card from "@components/Card";
import { Project } from "@utils/types";
import { fetchProjects } from "@utils/api";

const Home: React.FC = () => {
    const [hoveredItems, setHoveredItems] = useState<string[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const svgRef = useRef<SVGSVGElement>(null); // drawing connecting lines
    const itemRefs = useRef<Record<string, HTMLElement | null>>({}); // reference of project/skill cards

    const handleHover = (item: string | null) => {
        if (!item) {
            setHoveredItems([]);
            return;
        }
        const relatedSkills = projects
            .filter((project) => project.name == item)
            .flatMap((project) => project.skills);
        const relatedProjects = projects
            .filter((project) => project.skills.includes(item))
            .flatMap((project) => project.name);
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
    const skills = Array.from(
        new Set(projects.flatMap((project) => project.skills))
    );

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
                                key={project.id}
                                title={project.name}
                                onHover={() => handleHover(project.name)}
                                onHoverEnd={() => setHoveredItems([])}
                                onCardRef={(el) => (itemRefs.current[project.name] = el)}
                                isHovered={isHovered(project.name)}
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