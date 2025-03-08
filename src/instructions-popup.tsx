import {forwardRef, useImperativeHandle, useState} from "react";
import {Portal} from "semantic-ui-react";

export const InstructionsPopup = forwardRef((_, ref) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    // Exposing the `open` method to parent component via the ref
    useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
    }));

    return (
        <Portal open={isOpen} onClose={() => setOpen(false)}>
            <div className="instructions-popup">
                HELLO
            </div>
        </Portal>
    );
});
