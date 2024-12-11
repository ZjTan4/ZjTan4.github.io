import React from "react";

import "@assets/styles/components.css";

interface CardProps {
    title: string;
    onHover?: () => void;
    onHoverEnd?: () => void;
    onCardRef?: (node: HTMLElement | null) => void
}

const Card: React.FC<CardProps> = ({title, onHover, onHoverEnd, onCardRef}) => {
    return (
        <div 
            className="card-container" 
            ref={onCardRef}
            onMouseEnter={onHover}
            onMouseLeave={onHoverEnd}
        >
            <div className="floating-card">
                {title}
            </div>
            <div
                className="hidden"
            >
                description here 
            </div>
        </div>
    )
}

export default Card;
