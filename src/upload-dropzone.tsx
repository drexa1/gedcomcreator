import React, {ChangeEvent, DragEvent, useRef, useState} from "react";
import {FormattedMessage} from "react-intl";
import {Button, Icon} from "semantic-ui-react";

export const UploadDropzone = () => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleUploadDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        handleFiles(event.dataTransfer.files);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleFiles(event.target.files);
    };

    const handleFiles = (newFiles: FileList | null) => {
        if (newFiles) {
            setFiles([...files, ...Array.from(newFiles)]);
        }
    };

    return (
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
                    <FormattedMessage id="dropzone.p.drag-n-drop" defaultMessage="Drag & drop here your filled assets.templates, or " />
                    <span><FormattedMessage id="dropzone.p.browse-them" defaultMessage="browse them" /></span>
                </p>
                <p><FormattedMessage id="dropzone.p.files-needed" defaultMessage="We need all the 3 files" /></p>
                <Button>
                    <Icon name="upload" />
                    <FormattedMessage id="dropzone.button.browse-files" defaultMessage="Browse files" />
                </Button>
            </div>
            <div>
                <Button primary disabled={true}>
                    <FormattedMessage id="dropzone.button.submit" defaultMessage="Submit" />
                </Button>
            </div>
        </div>
    );
};