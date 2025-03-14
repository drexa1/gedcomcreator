import {saveAs} from 'file-saver';
import {FormattedMessage, useIntl} from 'react-intl';
import language from "./index";
import {MessageState} from "./app";

export const DownloadTemplates = ({ showMessage }: { showMessage: (msg: MessageState) => void; }) => {
    const { formatMessage } = useIntl();

    const templatesFileName = formatMessage({ id: "templates.zip", defaultMessage: "templates.zip" });
    const templatesFilePath = `${process.env.PUBLIC_URL}/templates/${language}/${templatesFileName}`;

    const individualsFilename = formatMessage({ id: "individuals.csv", defaultMessage: "1-individuals.csv" });
    const parentsFilename = formatMessage({ id: "parents.csv", defaultMessage: "2-parents.csv" });
    const relationshipsFilename = formatMessage({ id: "relationships.csv", defaultMessage: "3-relationships.csv" });

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
                        <span>{individualsFilename}</span>,&nbsp;
                        <span>{parentsFilename}</span>,&nbsp;
                        <span>{relationshipsFilename}</span>
                    </>
                )
            });
        })
        .catch((error) => console.error("Download failed:", error));
};
