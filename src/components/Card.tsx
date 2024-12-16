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
    return (
        <div 
            className="card-container" 
            ref={onCardRef}
            onMouseEnter={onHover}
            onMouseLeave={onHoverEnd}
        >
            <div className="floating-card">
                {children || (
                    <>
                        <h3>{cardInfo.name}</h3>
                        <p>{cardInfo.shortDescription}</p>
                    </>
                )}
            </div>
            <div
                className="hidden"
            >
                <p>
                    {cardInfo.description}
                </p>
            </div>
        </div>
    )
}

export default Card;
