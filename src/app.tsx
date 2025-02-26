import React, {useRef, useState} from 'react';
import {Button, Header, Icon} from "semantic-ui-react";

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

            <Header as='h1'>Digitalize your family records into a family file</Header>
            <p>It is (and will always be) free up to 50 relatives. Above 50 relatives, $0.5 per relative <Icon name="credit card"/></p>

            <div className="instructions-wrapper">
                <h2>How to use the converter:</h2>
                <div className="instructions-container">
                    <div className="instruction-box">
                        <h3>Download</h3>
                        <p>Download the templates to fill-in.</p>
                    </div>
                    <div className="instruction-box">
                        <h3>Fill-in</h3>
                        <p>Fill-in each template with the family records.</p>
                    </div>
                    <div className="instruction-box">
                        <h3>Use</h3>
                        <p>Download your family file so you can visualize it anywhere.</p>
                    </div>
                </div>
            </div>

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
                    <p>Drag & drop files here or <span>browse</span></p>
                    <Button><Icon name="cloud upload"/>Choose Files</Button>
                </div>
            </div>

        </div>
    );
}

export default App;
