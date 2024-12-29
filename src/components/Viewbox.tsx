import React, { useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import "@assets/styles/components.css"

interface ViewboxProps {
    children?: React.ReactNode;
}

const Viewbox: React.FC<ViewboxProps> = ({ children }) => {
    const scrollBoxRef = useRef<HTMLDivElement>(null);
    const location = useLocation(); // Add this to detect route changes

    useEffect(() => {
        const scrollBox = scrollBoxRef.current;
        if (!scrollBox) return;

        const resizeBody = () => {
            const height = scrollBox.offsetHeight;
            document.body.style.height = `${height}px`;
            console.log("Set body height to:", height);
        };

        const handleScroll = () => {
            console.log("scrolling");
            requestAnimationFrame(() => {
                scrollBox.style.transform = `translateY(${-window.scrollY}px)`;
            });
        };

        // Initial setup
        setTimeout(resizeBody, 100); // Wait for content to render
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', resizeBody);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', resizeBody);
            document.body.style.height = 'auto';
        };
    }, [location]); // Re-run effect when route changes

    return (
        <div className="viewbox">
            <div className="background-layer"></div>
            <div 
                ref={scrollBoxRef} 
                className="scrollbox"
                style={{ 
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    willChange: 'transform',
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Viewbox;