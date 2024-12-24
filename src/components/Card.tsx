import React from "react";

import "@assets/styles/components.css";
import { CardInfo } from "@utils/types";

interface CardProps {
    cardInfo: CardInfo;
    onHover?: () => void;
    onHoverEnd?: () => void;
    onCardRef?: (node: HTMLElement | null) => void;
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({cardInfo, onHover, onHoverEnd, onCardRef, children}) => {
    const handleClick = () => {
        if (!cardInfo.url) return;

        try {
            const url = new URL(cardInfo.url);
            // only allow http and https
            if (url.protocol === "http:" || url.protocol === "https:") {
                window.open(cardInfo.url, "_blank", "noopener,noreferrer");
            } else {
                console.error("Invalid URL protocol");
            }
        } catch (error) {
            console.error("Invalid URL", error);
        }
    }
    return (
        <div 
            className="card-container" 
            ref={onCardRef}
            onMouseEnter={onHover}
            onMouseLeave={onHoverEnd}
            onClick={handleClick}
            style={{ cursor: cardInfo.url ? 'pointer' : 'default' }}
        >
            {cardInfo.imageUrl ? (
                <div className="image-floating-card">
                    <img 
                        src={cardInfo.imageUrl} 
                        alt={cardInfo.name} 
                    />
                </div>
            ) : (
                <div className="floating-card">
                    <h3>{cardInfo.name}</h3>
                    <p>{cardInfo.shortDescription}</p>
                </div>
            )}
            <div
                className="hidden"
            >
                {children || (
                    <p>
                        {cardInfo.description}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Card;
