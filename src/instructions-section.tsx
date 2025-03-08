import React, {forwardRef, Ref, RefObject} from "react";
import {FormattedMessage} from "react-intl";
import {MessageState} from "./app";
import {downloadTemplates} from "./templates";
import {InstructionsPopup} from "./instructions-popup";

export const InstructionsSection = forwardRef(
    (
        { showMessage, instructionsRef}: {
            showMessage: (msg: MessageState) => void;
            instructionsRef: RefObject<{open: () => void}>;
        },
        ref: Ref<HTMLDivElement>
    ) => {
        return (
        // INSTRUCTIONS SECTION ----------------------------------------------------------------------------------------
        <div className="instructions-wrapper" ref={ref}>
                <h2><FormattedMessage id="instructions.h2" defaultMessage="How the tool works" /></h2>
                <div className="instructions-container">
                    <div className="instruction-box" onClick={() => downloadTemplates({ showMessage })}>
                        <h3><FormattedMessage id="instructions.download.h3" defaultMessage="Download"/></h3>
                        <p>
                            <FormattedMessage
                                id="instructions.download.p"
                                defaultMessage="Get here the assets.templates to fill-in. You need: individuals, parents, and relationships."/>
                        </p>
                    </div>
                    <div className="instruction-box" onClick={() => instructionsRef.current?.open()}>
                        <h3><FormattedMessage id="instructions.fill-in.h3" defaultMessage="Fill-in" /></h3>
                        <p>
                            <FormattedMessage
                                id="instructions.fill-in.p"
                                defaultMessage="Fill-in each template with the family records. Check here if you have doubts."/>
                        </p>
                    </div>
                    <InstructionsPopup ref={instructionsRef} />
                    <div className="instruction-box">
                        <h3><FormattedMessage id="instructions.collect.h3" defaultMessage="Collect" /></h3>
                        <p>
                            <FormattedMessage
                                id="instructions.collect.p"
                                defaultMessage="Collect your family file so you can visualize it anywhere. Know no one? Check this."/>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
);
