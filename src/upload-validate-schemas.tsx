import {useIntl} from "react-intl";
import Papa from "papaparse";
import {InvalidFilenamesError} from "./upload-exceptions";

export const useValidationSchemas = () => {  // custom hook naming convention
    const i18n = useIntl();

    const individualsFilename = i18n.formatMessage({ id: "individuals.csv", defaultMessage: "1-individuals.csv" });
    const parentsFilename = i18n.formatMessage({ id: "parents.csv", defaultMessage: "2-parents.csv" });
    const relationshipsFilename = i18n.formatMessage({ id: "relationships.csv", defaultMessage: "3-relationships.csv" });

    const individualsFileColumns = i18n.formatMessage({
        id: "individuals.file.columns",
        defaultMessage: "individual_id, name, surname1, surname2, nickname, gender, birth_date, birth_place, notes"
    }).split(", ");
    const parentsFileColumns = i18n.formatMessage({
        id: "parents.file.columns",
        defaultMessage: "individual_id, father_id, mother_id"
    }).split(", ");
    const relationshipsFileColumns = i18n.formatMessage({
        id: "relationships.file.columns",
        defaultMessage: "husband_id, wife_id, notes"
    }).split(", ");

    // { filenames: required columns }
    return {
        individualsFilename: individualsFileColumns,
        parentsFilename: parentsFileColumns,
        relationshipsFilename: relationshipsFileColumns
    };
};

export function validateFilenames(files: File[], validFilenames: string[]): void {
    const invalidFilenames = new Set<string>();
    for (const file of files) {
        if (!validFilenames.includes(file.name)) {
            invalidFilenames.add(file.name);
        }
    }
    if (invalidFilenames.size > 0) {
        throw new InvalidFilenamesError(Array.from(invalidFilenames));
    }
}

export function validateFile(filename: string, content: string, validationSchemas: Record<string, string[]>) {
    const parsedData = Papa.parse(content, { header: true, skipEmptyLines: true });
    if (parsedData.errors.length) {
        console.error("CSV loading errors:", parsedData.errors);
        return false;
    }
    const rows = parsedData.data as Record<string, string>[];
    return validateColumns(filename, rows, validationSchemas[filename])
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
