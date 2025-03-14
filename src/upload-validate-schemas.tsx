import {useIntl} from "react-intl";

export const validationSchemas = () => {

    // Keys: filenames
    const individualsFilename = useIntl().formatMessage({ id: "individuals.csv", defaultMessage: "1-individuals.csv" });
    const parentsFilename = useIntl().formatMessage({ id: "parents.csv", defaultMessage: "2-parents.csv" });
    const relationshipsFilename = useIntl().formatMessage({ id: "relationships.csv", defaultMessage: "3-relationships.csv" });

    // Values: columns
    const individualsFileColumns = useIntl().formatMessage({
        id: "individuals.file.columns",
        defaultMessage: "individual_id, name, surname1, surname2, nickname, gender, birth_date, birth_place, notes"
    }).split(", ");
    const parentsFileColumns = useIntl().formatMessage({
        id: "parents.file.columns",
        defaultMessage: "individual_id, father_id, mother_id"
    }).split(", ");
    const relationshipsFileColumns = useIntl().formatMessage({
        id: "relationships.file.columns",
        defaultMessage: "husband_id, wife_id, notes"
    }).split(", ");

    return {
        individualsFilename: individualsFileColumns,
        parentsFilename: parentsFileColumns,
        relationshipsFilename: relationshipsFileColumns
    };
};
