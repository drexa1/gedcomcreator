import React, {useRef, useState} from 'react';
import {Button, Header, Icon} from "semantic-ui-react";
import {FormattedMessage} from "react-intl";

const App = () => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
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

            <Header as='h1'><FormattedMessage id="header.h1" defaultMessage="Digitalize all your genealogy records into a family file"/></Header>
            <p><FormattedMessage id="header.p" defaultMessage="It is (and will always be) free up to 50 relatives. Above 50 relatives, $0.5 per relative"/> <Icon name="credit card"/></p>

            {/* INSTRUCTIONS SECTION ------------------------------------------------------------------------------- */}
            <div className="instructions-wrapper">
                <h2><FormattedMessage id="instructions.h2" defaultMessage="How the tool works"/></h2>
                <div className="instructions-container">
                    <div className="instruction-box">
                        <h3><FormattedMessage id="instructions.download.h3" defaultMessage="Download"/></h3>
                        <p><FormattedMessage id="instructions.download.p" defaultMessage="Get here the templates to fill-in. You need: individuals, parents, and relationships."/></p>
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
                    onClick={handleClick}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}>
                    <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                    <p>
                        <FormattedMessage id="dropzone.p.drag-n-drop" defaultMessage="Drag & drop here your filled templates, or "/>
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
