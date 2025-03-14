import {useIntl} from "react-intl";
import Papa from "papaparse";

export const useValidationSchemas = () => {  // custom hook naming convention

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


export function ValidateFile(filename: string, content: string) {
    const parsedData = Papa.parse(content, { header: true, skipEmptyLines: true });
    if (parsedData.errors.length) {
        console.error("CSV loading errors:", parsedData.errors);
        return false;
    }
    const rows = parsedData.data as Record<string, string>[];
    return validateColumns(filename, rows, useValidationSchemas()[filename])
}

function validateColumns(filename: string, rows: Record<string, string>[], requiredColumns: string[]) {
    // Check for missing columns
    const headers = Object.keys(rows[0]);
    const missingColumns = requiredColumns.filter(col => !headers.includes(col));
    if (missingColumns.length) {
        const error = `${filename}: the following required columns are missing: ${missingColumns.join(", ")}`
        console.error(error);
        return false;
    }
    return true;
}
