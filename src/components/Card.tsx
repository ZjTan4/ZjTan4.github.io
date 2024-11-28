import React from "react";

import "@assets/styles/components.css";

interface CardProps {
    title: string;
    onHover?: () => void;
    onHoverEnd?: () => void;
    onCardRef?: (node: HTMLElement | null) => void
    isHovered?: boolean;
}

const Card: React.FC<CardProps> = ({title, onHover, onHoverEnd, onCardRef, isHovered}) => {
    return (
        <div 
          className={`floating-card ${isHovered ? "hovered" : ""}`}
          ref={onCardRef}
          onMouseEnter={onHover}
          onMouseLeave={onHoverEnd}
        >
            {title}
        </div>
    )
}

export default Card;
