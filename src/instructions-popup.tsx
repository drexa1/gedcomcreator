import {forwardRef, useImperativeHandle, useState} from "react";
import {Header, Icon, Modal, Portal} from "semantic-ui-react";
import { useSwipeable } from "react-swipeable";

export const InstructionsPopup = forwardRef((_, ref) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalCards = 4;
    const [isClicked, setIsClicked] = useState(false);

    const nextSlide = () => {
        if (currentIndex < totalCards - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Handle click feedback
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: nextSlide,    // Swipe left to go to the next slide
        onSwipedRight: prevSlide,   // Swipe right to go back
        preventScrollOnSwipe: true, // Prevents scrolling while swiping
        trackMouse: true            // Allows swipe on desktop too
    });

    // Exposing the `open` method to parent component via the ref
    useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
    }));

    return (
        <Modal open={isOpen} onClose={() => setOpen(false)} className="instructions-popup">
            <div className="carousel-wrapper" {...swipeHandlers}>
                {/* Left Arrow */}
                <div
                    className={`arrow left-arrow ${currentIndex === 0 ? "hidden" : ""}`}
                    onClick={prevSlide}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}>
                    <svg width="80" height="100%" viewBox="0 0 24 48">
                        <path
                            d="M15 4l-8 20 8 20"
                            stroke="lightgray"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>
                </div>
                {/* Main Content */}
                <div className="carousel-content">
                    <Header as="h1">Card {currentIndex + 1} Header</Header>
                    <div className="carousel-body">This is the content of card {currentIndex + 1}</div>
                    <div className="dots-container">
                        {Array.from({ length: totalCards }).map((_, index) => (
                            <span key={index} className={`dot ${index === currentIndex ? "active" : ""}`} />
                        ))}
                    </div>
                </div>
                {/* Right Arrow */}
                {currentIndex < totalCards - 1 && (
                    <div
                        className={`arrow right-arrow ${currentIndex === totalCards - 1 ? "hidden" : ""}`}
                        onClick={nextSlide}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}>
                        <svg width="80" height="100%" viewBox="0 0 24 48">
                            <path
                                d="M9 4l8 20-8 20"
                                stroke="lightgray"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"/>
                        </svg>
                    </div>
                )}
            </div>
        </Modal>
    );
});
