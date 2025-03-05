import React, {ReactNode, useRef, useState} from 'react';
import {Button, Header, Icon, Message} from "semantic-ui-react";
import {saveAs} from "file-saver";
import language from "./index";
import {FormattedMessage} from "react-intl";
import resources_es from "./i18n/resources/es.json";
import resources_pl from "./i18n/resources/pl.json";

const resources = {
    es: resources_es,
    pl: resources_pl
};

interface MessageState {
    type: "positive" | "negative";
    header: ReactNode;
    text: ReactNode;
}

const App = () => {
    const [message, setMessage] = useState<MessageState | null>(null);
    const [visible, setVisible] = useState(false); // messages visibility

    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const downloadTemplates = () => {
        const templatesFileName = resources[language]?.["templates.zip"] ?? "templates.zip";
        const templatesFilePath = `${process.env.PUBLIC_URL}/templates/${language}/${templatesFileName}`;
        fetch(templatesFilePath)
            .then((response) => response.blob())
            .then((blob) => {
                saveAs(blob, templatesFileName);
                showMessage({
                    type: "positive",
                    header: (
                        <FormattedMessage
                            id="instructions.templates.downloaded"
                            defaultMessage="Review your Downloads folder"/>
                    ),
                    text: (
                        <>
                        <FormattedMessage
                            id="instructions.templates.compressed"
                            defaultMessage="You will find the assets.templates in the compressed file:"/>&nbsp;
                            <span>{resources[language]?.["individuals.csv"] ?? "1-individuals.csv"}</span>,&nbsp;
                            <span>{resources[language]?.["parents.csv"] ?? "2-parents.csv"}</span>,&nbsp;
                            <span>{resources[language]?.["relationships.csv"] ?? "3-relationships.csv"}</span>
                        </>
                    )
                });
            })
            .catch((error) => console.error("Download failed:", error));
    };

    const showMessage = (msg: MessageState) => {
        // Function to show and fade out the message
        setMessage(msg);
        setVisible(true);
        setTimeout(() => setVisible(false), 15000);
        setTimeout(() => setMessage(null), 20000);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };
    const handleUploadDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        handleFiles(event.dataTransfer.files);
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(event.target.files);
    };

    const handleFiles = (newFiles: FileList | null) => {
        if (newFiles) {
            setFiles([...files, ...Array.from(newFiles)]);
        }
    };

    return (
        <div className="body">

            {/* MESSAGES SECTION ----------------------------------------------------------------------------------- */}
            {message && (
                <div className={`message-container ${visible ? "expanded" : "collapsed"}`}>
                    <Message
                        positive={message.type === "positive"}
                        negative={message.type === "negative"}
                        onDismiss={() => setMessage(null)}>
                            <Message.Header>{message.header}</Message.Header>
                            <p>{message.text}</p>
                    </Message>
                </div>
            )}
            {/* MESSAGES SECTION ----------------------------------------------------------------------------------- */}

            <Header as='h1'><FormattedMessage id="header.h1" defaultMessage="Digitalize all your genealogy records into a family file"/></Header>
            <p><FormattedMessage id="header.p" defaultMessage="It is (and will always be) free up to 50 relatives. Above 50 relatives, $0.5 per relative"/> <Icon name="credit card"/></p>

            {/* INSTRUCTIONS SECTION ------------------------------------------------------------------------------- */}
            <div className="instructions-wrapper">
                <h2><FormattedMessage id="instructions.h2" defaultMessage="How the tool works"/></h2>
                <div className="instructions-container">
                    <div className="instruction-box" onClick={downloadTemplates}>
                        <h3><FormattedMessage id="instructions.download.h3" defaultMessage="Download"/></h3>
                        <p><FormattedMessage id="instructions.download.p" defaultMessage="Get here the assets.templates to fill-in. You need: individuals, parents, and relationships."/></p>
                    </div>
                    <div className="instruction-box">
                        <h3><FormattedMessage id="instructions.fill-in.h3" defaultMessage="Fill-in"/></h3>
                        <p><FormattedMessage id="instructions.fill-in.p" defaultMessage="Fill-in each template with the family records. Check here if you have doubts."/></p>
                    </div>
                    <div className="instruction-box">
                        <h3><FormattedMessage id="instructions.collect.h3" defaultMessage="Collect"/></h3>
                        <p><FormattedMessage id="instructions.collect.p" defaultMessage="Collect your family file so you can visualize it anywhere. Know no one? Check this."/></p>
                    </div>
                </div>
            </div>
            {/* INSTRUCTIONS SECTION ------------------------------------------------------------------------------- */}

            {/* UPLOAD SECTION ------------------------------------------------------------------------------------- */}
            <div className="ui upload-container">
                <div
                    className="ui dropzone"
                    onClick={handleUploadClick}
                    onDrop={handleUploadDrop}
                    onDragOver={(e) => e.preventDefault()}>
                    <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                    <p>
                        <FormattedMessage id="dropzone.p.drag-n-drop" defaultMessage="Drag & drop here your filled assets.templates, or "/>
                        <span><FormattedMessage id="dropzone.p.browse-them" defaultMessage="browse them"/></span>
                    </p>
                    <p><FormattedMessage id="dropzone.p.files-needed" defaultMessage="We need all the 3 files"/></p>
                    <Button><Icon name="upload"/><FormattedMessage id="dropzone.button.browse-files" defaultMessage="Browse files"/></Button>
                </div>
            </div>
            <div>
                <Button primary disabled={true}><FormattedMessage id="dropzone.button.submit" defaultMessage="Submit"/></Button>
            </div>
            {/* UPLOAD SECTION ------------------------------------------------------------------------------------- */}

        </div>
    );
}

export default App;
