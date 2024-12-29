import { useEffect, useRef } from "react"

import "@assets/styles/components.css"

interface RevealSectionProps {
  children?: React.ReactNode;
}

const RevealSection: React.FC<RevealSectionProps> = ({ children }) => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                    } else {
                        entry.target.classList.remove("revealed");
                    }
                });
            },
            { 
                threshold: 0.01,
                rootMargin: '0px 0px 0px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="floating-section">
            {children}
        </section>
    )
}

export default RevealSection;
