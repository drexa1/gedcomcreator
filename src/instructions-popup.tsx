import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {Header, Modal} from "semantic-ui-react";
import { useSwipeable } from "react-swipeable";
import {Arrow} from "./instructions-popup-arrow";

export const InstructionsPopup = forwardRef((_, ref) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isClicked, setIsClicked] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalCards = 4;

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0); // Reset slide index to 0 whenever the modal opens
        }
    }, [isOpen]);

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
                <Arrow direction="left" onClick={prevSlide} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} hidden={currentIndex === 0}/>

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
                <Arrow direction="right" onClick={nextSlide} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} hidden={currentIndex === totalCards - 1}/>
            </div>
        </Modal>
    );
});
