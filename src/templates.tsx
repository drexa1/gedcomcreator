import {saveAs} from 'file-saver';
import {FormattedMessage} from 'react-intl';
import resources_es from "./i18n/resources/es.json";
import resources_pl from "./i18n/resources/pl.json";
import language from "./index";
import {MessageState} from "./app";

const resources = {
    es: resources_es,
    pl: resources_pl
};

export const downloadTemplates = ({ showMessage }: { showMessage: (msg: MessageState) => void; }) => {
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
