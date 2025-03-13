import React from "react";

interface ArrowProps {
    direction: "left" | "right";
    onClick: () => void;
    onMouseDown: () => void;
    onMouseUp: () => void;
    hidden: boolean;
}

export const Arrow: React.FC<ArrowProps> = ({direction, onClick, onMouseDown, onMouseUp, hidden}) => {
    const arrowClass = direction === "left" ? "left-arrow" : "right-arrow";
    const svgPath = direction === "left" ? "M15 4l-8 20 8 20" : "M9 4l8 20-8 20";
    return (
        <div className={`arrow ${arrowClass} ${hidden ? "hidden" : ""}`}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}>
            <svg width="80" height="100%" viewBox="0 0 24 48">
                <path
                    d={svgPath}
                    stroke="lightgray"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};