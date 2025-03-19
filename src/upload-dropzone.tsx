import React, {ChangeEvent, DragEvent, useRef, useState} from "react";
import {FormattedMessage} from "react-intl";
import {Button, Icon} from "semantic-ui-react";
import {uploadValidation} from "./upload-validate";
import {MessageState} from "./app";
import {useValidationSchemas} from "./upload-validate-schemas";
import {UploadError} from "./upload-exceptions";

export const UploadDropzone = ({ showMessage }: { showMessage: (message: MessageState) => void }) => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const validationSchemas = useValidationSchemas();

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleUploadDrop = async (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        await HandleFiles(event.dataTransfer.files);
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        await HandleFiles(event.target.files);
    };

    const HandleFiles = async (newFiles: FileList | null) => {
        try {
            if (newFiles) {
                const validFiles = uploadValidation(newFiles, files, validationSchemas);
                if (validFiles) {
                    setFiles([...files, ...validFiles]);  // add to previous
                }
            }
        } catch (e) {
            if (e instanceof UploadError) {
                showMessage({
                    type: "negative",
                    header: (<FormattedMessage id={ e.literal } defaultMessage={ e.message } values={ e.details }/>),
                    text: null
                });
            }
        }
    };

    return (
        <div className="ui upload-container">
            <div
                className="ui dropzone"
                onClick={handleUploadClick}
                onDrop={handleUploadDrop}
                onDragOver={(e) => e.preventDefault()}>
                <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }}/>
                <p>
                    <FormattedMessage id="dropzone.p.drag-n-drop" defaultMessage="Drag & drop here your filled assets.templates, or "/>
                    <span><FormattedMessage id="dropzone.p.browse-them" defaultMessage="browse them"/></span>
                </p>
                <p><FormattedMessage id="dropzone.p.files-needed" defaultMessage="We need all the 3 files"/></p>
                <Button>
                    <Icon name="upload"/>
                    <FormattedMessage id="dropzone.button.browse-files" defaultMessage="Browse files"/>
                </Button>
            </div>
            <Button primary disabled={true}>
                <FormattedMessage id="dropzone.button.submit" defaultMessage="Submit"/>
            </Button>
        </div>
    );
};