import React, { useState, useEffect, useRef } from "react";

import "@assets/styles/layout.css";
import Card from "@components/Card";
import { CardInfo } from "@utils/types";
import { fetchCardInfos } from "@utils/api";
import RevealSection from "@components/RevealSection";
import WelcomeSection from "@components/Welcome";

// this is kinda ugly but it works so I am gonna put it like this for now
// , should be refactored in future TODO
enum ConnectionType {
    STANDARD = 'standard', 
    LEFT_EDGE = 'left-edge', 
    RIGHT_EDGE = 'right-edge',
}

const connectionConfigs: Record<string, Record<string, ConnectionType>> = {
    "html/css": {
        "iconnect": ConnectionType.LEFT_EDGE,
        "itwêwina-plains-cree-dictionary": ConnectionType.LEFT_EDGE
    },
    "javascript": {
        "iconnect": ConnectionType.LEFT_EDGE,
        "itwêwina-plains-cree-dictionary": ConnectionType.LEFT_EDGE
    },
    "python": {
        "experimental-mobile-robot": ConnectionType.RIGHT_EDGE,
        "machine-learning-research": ConnectionType.RIGHT_EDGE, 
        "machine-learning-research1": ConnectionType.RIGHT_EDGE,
    },
};

const createLine = (x1: number, y1: number, x2: number, y2: number) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    const attributes = {
        x1: x1.toString(),
        y1: y1.toString(),
        x2: x2.toString(),
        y2: y2.toString(),
        stroke: "orange",
        "stroke-dasharray": "4",
        "stroke-width": "4"
    };
    Object.entries(attributes).forEach(([key, value]) => 
        line.setAttribute(key, value)
    );
    return line;
};

const Home: React.FC = () => {
    const [hoveredItems, setHoveredItems] = useState<string[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    // hooks
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
        const drawLineBetweenCards = (fromId: string, toIds: string[]) => {
            const svgRect = svgRef.current!.getBoundingClientRect();
            const from = cardRefs.current[fromId];
            if (!from) return;
            const fromRect = from.getBoundingClientRect();

            toIds.map((toId) => {
                const to = cardRefs.current[toId];
                if (!to) return;
                const connectionType = connectionConfigs[fromId]?.[toId];
                const toRect = to.getBoundingClientRect();
                
                // Get the container sections
                const fromSection = from.closest('section') || from.parentElement;
                const toSection = to.closest('section') || to.parentElement;
                if (!fromSection || !toSection) return;
                // Calculate the middle point between the sections
                const fromSectionRect = fromSection.getBoundingClientRect();
                const toSectionRect = toSection.getBoundingClientRect();
                // Calculate vertical offset using the bottom of the higher section and top of the lower section
                const verticalOffset = (Math.min(fromSectionRect.bottom, toSectionRect.bottom) + 
                                    Math.max(fromSectionRect.top, toSectionRect.top)) / 2 - svgRect.y;
                const horizontalOffset = 20; // Distance from target's edge

                if (connectionType === ConnectionType.LEFT_EDGE) {
                    // Initial points
                    const fromX = (fromRect.x + fromRect.width / 2) - svgRect.x;
                    const fromY = fromRect.y < toRect.y ? fromRect.bottom - svgRect.y : fromRect.top - svgRect.y;
                    const toX = toRect.x - svgRect.x;
                    const toY = (toRect.y + toRect.height / 2) - svgRect.y;

                    // Add four line segments
                    svg.appendChild(createLine(fromX, fromY, fromX, verticalOffset));
                    svg.appendChild(createLine(fromX, verticalOffset, toX - horizontalOffset, verticalOffset));
                    svg.appendChild(createLine(toX - horizontalOffset, verticalOffset, toX - horizontalOffset, toY));
                    svg.appendChild(createLine(toX - horizontalOffset, toY, toX, toY));
                } else if (connectionType === ConnectionType.RIGHT_EDGE) {
                    // Initial points
                    const fromX = (fromRect.x + fromRect.width / 2) - svgRect.x;
                    const fromY = fromRect.y < toRect.y ? fromRect.bottom - svgRect.y : fromRect.top - svgRect.y;
                    const toX = (toRect.x + toRect.width) - svgRect.x;
                    const toY = (toRect.y + toRect.height / 2) - svgRect.y;

                    // Add four line segments
                    svg.appendChild(createLine(fromX, fromY, fromX, verticalOffset));
                    svg.appendChild(createLine(fromX, verticalOffset, toX + horizontalOffset, verticalOffset));
                    svg.appendChild(createLine(toX + horizontalOffset, verticalOffset, toX + horizontalOffset, toY));
                    svg.appendChild(createLine(toX + horizontalOffset, toY, toX, toY));
                } else {
                    const fromX = (fromRect.x + fromRect.width / 2) - svgRect.x;
                    const fromY = fromRect.y < toRect.y ? fromRect.bottom - svgRect.y : fromRect.top - svgRect.y;
                    const toX = (toRect.x + toRect.width / 2) - svgRect.x;
                    const toY = fromRect.y >= toRect.y ? toRect.bottom - svgRect.y : toRect.top - svgRect.y;
                    
                    // Add three line segments
                    svg.appendChild(createLine(fromX, fromY, fromX, verticalOffset));
                    svg.appendChild(createLine(fromX, verticalOffset, toX, verticalOffset));
                    svg.appendChild(createLine(toX, verticalOffset, toX, toY));
                }
            });
        };
        if (hoveredItems.length > 1) {
            const [fromItem, ...toItems] = hoveredItems;
            drawLineBetweenCards(fromItem, toItems);
        }
    };

    useEffect(() => {
        // draw lines
        drawLines();
        return () => {
            if (svgRef.current) svgRef.current.innerHTML = "";
        };
    }, [hoveredItems]);

    useEffect(() => {
        // load card information
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
        <div className="home-container">
            <WelcomeSection />
            <RevealSection>
                {/* web development */}
                <div className="web-development-projects-container frost-glass">
                    <div className="web-development-projects-content">
                        <div className="web-development-projects-container-left">
                            <h2 className="section-title">Web Developer</h2>
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
            </RevealSection>
            <RevealSection>
                {loaded ? (
                    <div className="skills-container">
                        {/* programing */}
                        <div className="skills-container-row">
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
                                cardInfo={cardInfoRefs.current["java"]}
                                onHover={() => handleHover("java")}
                                onHoverEnd={() => setHoveredItems([])}
                                onCardRef={(el) => (cardRefs.current["java"] = el)}
                            />
                            <Card
                                cardInfo={cardInfoRefs.current["c++"]}
                                onHover={() => handleHover("c++")}
                                onHoverEnd={() => setHoveredItems([])}
                                onCardRef={(el) => (cardRefs.current["c++"] = el)}
                            />
                        </div>
                        <div className="skills-container-row">
                            <Card
                                cardInfo={cardInfoRefs.current["html/css"]}
                                onHover={() => handleHover("html/css")}
                                onHoverEnd={() => setHoveredItems([])}
                                onCardRef={(el) => (cardRefs.current["html/css"] = el)}
                            >
                            </Card>
                            <Card
                                cardInfo={cardInfoRefs.current["sql"]}
                                onHover={() => handleHover("sql")}
                                onHoverEnd={() => setHoveredItems([])}
                                onCardRef={(el) => (cardRefs.current["sql"] = el)}
                            />
                        </div>
                    </div>
                ) : (
                    <p>Loading card...</p>
                )}
            </RevealSection>
            <RevealSection>
                <div className="work-container">
                    <div className="work-container-left frost-glass">
                        <p>AI Researcher</p>
                        {loaded ? (
                            <div className="ai-research-container">
                                <Card
                                    cardInfo={cardInfoRefs.current["machine-learning-research"]}
                                    onHover={() => handleHover("machine-learning-research")}
                                    onHoverEnd={() => setHoveredItems([])}
                                    onCardRef={(el) => (cardRefs.current["machine-learning-research"] = el)}
                                />
                                <Card
                                    cardInfo={cardInfoRefs.current["experimental-mobile-robot"]}
                                    onHover={() => handleHover("experimental-mobile-robot")}
                                    onHoverEnd={() => setHoveredItems([])}
                                    onCardRef={(el) => (cardRefs.current["experimental-mobile-robot"] = el)}
                                />
                                <Card
                                    cardInfo={cardInfoRefs.current["machine-learning-research1"]}
                                    onHover={() => handleHover("machine-learning-research1")}
                                    onHoverEnd={() => setHoveredItems([])}
                                    onCardRef={(el) => (cardRefs.current["machine-learning-research1"] = el)}
                                />
                            </div>
                        ) : (
                            <p>Loading card...</p>
                        )}
                    </div>
                    <div className="work-container-right">
                        <div className="software-development-container frost-glass">
                            <p>Software Developer</p>
                            {loaded ? (
                                <div className="software-development-content">
                                    <Card
                                        cardInfo={cardInfoRefs.current["periodic-trajectory-on-polygonal-surfaces"]}
                                        onHover={() => handleHover("periodic-trajectory-on-polygonal-surfaces")}
                                        onHoverEnd={() => setHoveredItems([])}
                                        onCardRef={(el) => (cardRefs.current["periodic-trajectory-on-polygonal-surfaces"] = el)}
                                    >
                                    </Card>
                                    <Card
                                        cardInfo={cardInfoRefs.current["ibook"]}
                                        onHover={() => handleHover("ibook")}
                                        onHoverEnd={() => setHoveredItems([])}
                                        onCardRef={(el) => (cardRefs.current["ibook"] = el)}
                                    />
                                </div>
                            ) : (
                                <p>Loading card...</p>
                            )}
                        </div>
                        <div className="work-title-container">
                            <div className="work-title-container-text">
                                Work
                            </div>
                        </div>
                    </div>
                </div>
            </RevealSection>
            {/* render dotted lines to connect project and skills */}
            <svg ref={svgRef} className="svg-lines" />
        </div>
    );
};

export default Home;
