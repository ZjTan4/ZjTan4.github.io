import React, { useState, useEffect, useRef } from "react";

import "@assets/styles/layout.css";
import Card from "@components/Card";
import { CardInfo } from "@utils/types";
import { fetchCardInfos } from "@utils/api";

const Home: React.FC = () => {
    const [hoveredItems, setHoveredItems] = useState<string[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const svgRef = useRef<SVGSVGElement>(null); // drawing connecting lines
    const cardRefs = useRef<Record<string, HTMLElement | null>>({}); // reference of project/skill cards
    const cardInfoRefs = useRef<Record<string, CardInfo>>({}); // content used to render the cards

    const handleHover = (cardId: string | null) => {
        if (!cardId || !loaded) {
            setHoveredItems([]);
            return;
        }
        const cardInfo = cardInfoRefs.current[cardId];
        if (!cardInfo) return;
        const newHoveredItems = cardInfo.relatedCard || [];
        setHoveredItems([cardId, ...newHoveredItems]);
    };
    const drawLines = () => {
        // draw lines with svg
        const svg = svgRef.current;
        if (!svg) return;
        svg.innerHTML = ""; // clear svg

        const createLine = (x1: number, y1: number, x2: number, y2: number) => {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            const attributes = {
                x1: x1.toString(),
                y1: y1.toString(),
                x2: x2.toString(),
                y2: y2.toString(),
                stroke: "orange",
                "stroke-dasharray": "4",
                "stroke-width": "2"
            };
            Object.entries(attributes).forEach(([key, value]) => 
                line.setAttribute(key, value)
            );
            return line;
        };

        const drawLineBetweenCards = (from: HTMLElement | null, to: HTMLElement | null) => {
            if (!from || !to) return;
            const svgRect = svgRef.current!.getBoundingClientRect();
            const fromRect = from.getBoundingClientRect();
            const toRect = to.getBoundingClientRect();
            const upperContainer = fromRect.y < toRect.y ? from.parentElement : to.parentElement;
            const lowerContainer = fromRect.y >= toRect.y ? from.parentElement : to.parentElement;

            // compute coordinates
            // since the svg is embedded in Home instead of the whole page
            // , add offset to correct the coordinate system
            const fromX = (fromRect.x + fromRect.width / 2) - svgRect.x;
            const fromY = fromRect.y < toRect.y ? fromRect.bottom - svgRect.y : fromRect.top - svgRect.y;
            const toX = (toRect.x + toRect.width / 2) - svgRect.x;
            const toY = fromRect.y >= toRect.y ? toRect.bottom - svgRect.y : toRect.top - svgRect.y;
            // mid-line for alignment
            const middleY = (upperContainer!.getBoundingClientRect().bottom + lowerContainer!.getBoundingClientRect().top) / 2 - svgRect.y;

            // Add line segments
            svg.appendChild(createLine(fromX, fromY, fromX, middleY)); // Vertical line from "from" card
            svg.appendChild(createLine(fromX, middleY, toX, middleY)); // Horizontal line connecting midpoints
            svg.appendChild(createLine(toX, middleY, toX, toY)); // Vertical line to "to" card
        };
        if (hoveredItems.length > 1) {
            const [fromItem, ...toItems] = hoveredItems;
            toItems.forEach((toItem) => {
                const fromCard = cardRefs.current[fromItem];
                const toCard = cardRefs.current[toItem];
                drawLineBetweenCards(fromCard, toCard);
            });
        }
    };

    useEffect(() => {
        drawLines();
        return () => {
            if (svgRef.current) svgRef.current.innerHTML = "";
        };
    }, [hoveredItems]);

    useEffect(() => {
        const loadCardInfos = async () => {
            try {
                const data: CardInfo[] = await fetchCardInfos();
                data.map((cardInfo) => {
                    cardInfoRefs.current[cardInfo.id] = cardInfo;
                });
                setLoaded(true);
            } catch (error: any) {
                console.error("Error fetching card infos:", error);
            }
        };
        loadCardInfos();
    }, []);

    return (
        <div className="hero">
            <header>
                <h1>Zijie Tan</h1>
                <p>ztan4@ualberta.ca</p>
            </header>
            <section className="floating-section">
                {/* web development */}
                <div className="web-development-projects-container">
                    <div className="web-development-projects-content">
                        <div className="web-development-projects-container-left">
                            <h2 className="section-title">Web Development</h2>
                            <p className="section-description">hello hello hello hello hello hello hello hello</p>
                            {loaded ? (
                                <Card 
                                    cardInfo={cardInfoRefs.current["personal-website"]}
                                    onHover={() => handleHover("personal-website")}
                                    onHoverEnd={() => setHoveredItems([])}
                                    onCardRef={(el) => (cardRefs.current["personal-website"] = el)}
                                />
                            ) : (
                                <p>Loading card...</p>
                            )}
                        </div>
                        <div className="web-development-projects-container-right">
                            {loaded ? (
                                <div>
                                    <Card
                                        cardInfo={cardInfoRefs.current["iconnect"]}
                                        onHover={() => handleHover("iconnect")}
                                        onHoverEnd={() => setHoveredItems([])}
                                        onCardRef={(el) => (cardRefs.current["iconnect"] = el)}
                                    />
                                    <Card 
                                        cardInfo={cardInfoRefs.current["itwêwina-plains-cree-dictionary"]}
                                        onHover={() => handleHover("itwêwina-plains-cree-dictionary")}
                                        onHoverEnd={() => setHoveredItems([])}
                                        onCardRef={(el) => (cardRefs.current["itwêwina-plains-cree-dictionary"] = el)} 
                                    />
                                </div>
                            ) : (
                                <p>Loading card...</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <section className="floating-section">
                <div className="skills-container">  
                    {/* program lanuages */}
                    {loaded ? (
                        <div className="skills-content">
                            <Card
                                cardInfo={cardInfoRefs.current["javascript"]}
                                onHover={() => handleHover("javascript")}
                                onHoverEnd={() => setHoveredItems([])}
                                onCardRef={(el) => (cardRefs.current["javascript"] = el)}
                            >
                            </Card>
                            <Card
                                cardInfo={cardInfoRefs.current["python"]}
                                onHover={() => handleHover("python")}
                                onHoverEnd={() => setHoveredItems([])}
                                onCardRef={(el) => (cardRefs.current["python"] = el)}
                            />
                            <Card
                                cardInfo={cardInfoRefs.current["machine-learning"]}
                                onHover={() => handleHover("machine-learning")}
                                onHoverEnd={() => setHoveredItems([])}
                                onCardRef={(el) => (cardRefs.current["machine-learning"] = el)}
                            />
                        </div>
                    ) : (
                        <p>Loading card...</p>
                    )}
                </div>
            </section>
            {/* render dotted lines to connect project and skills */}
            <svg ref={svgRef} className="svg-lines" />
        </div>
    );
};

export default Home;
