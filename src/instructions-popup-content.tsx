import React from "react";
import { Header } from "semantic-ui-react";

interface InstructionsContentProps {
    currentIndex: number;
    totalCards: number;
}

export const InstructionsContent: React.FC<InstructionsContentProps> = ({ currentIndex, totalCards }) => {
    return (
        <div className="carousel-content">
            <Header as="h1">Card {currentIndex + 1} Header</Header>
            <div className="carousel-body">
                This is the content of card {currentIndex + 1}
            </div>
            <div className="dots-container">
                {Array.from({ length: totalCards }).map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? "active" : ""}`}
                    />
                ))}
            </div>
        </div>
    );
};
