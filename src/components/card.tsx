import React from "react";

import "@assets/styles/components.css";

interface CardProps {
    title: string;
    onHover?: () => void;
    isHovered?: boolean;
}

const Card: React.FC<CardProps> = ({title, onHover, isHovered}) => {
    return (
        <div 
          className={`floating-card ${isHovered ? "hovered" : ""}`}
          onMouseEnter={onHover}
          onMouseLeave={() => onHover && onHover()}
        >
            {title}
        </div>
    )
}

export default Card;
