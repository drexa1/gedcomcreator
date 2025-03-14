import {validateFile, useValidationSchemas} from "./upload-validate-schemas";

export const useUploadValidation = (files: FileList | null) => {  // custom hook naming convention
    if (!files) return null

    // Validate file names
    const expectedFilenames = Object.keys(useValidationSchemas())
    if (!validateFilenames(Array.from(files), expectedFilenames)) {
        return null  // TODO: reject(new Error(`Invalid file format: ${file.name}`));
    }

    // Basic schema validation
    const fileReadPromises = Array.from(files).map(file => {
        return new Promise<File | null>((resolve) => {
            const reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = () => {
                const fileContent = reader.result as string;
                const validFile = validateFile(file.name, fileContent);
                if (validFile) {
                    resolve(file);
                } else {
                    resolve(null);
                }
            };
            reader.onerror = () => {
                console.error("Error reading file:", file.name);
                // setErrors(["Error reading file:" + file.name])  TODO: add to errors bundle
                resolve(null); // Resolve as null to exclude invalid files
            };
        });
    });

    // Wait for all file validations to complete
    Promise.all(fileReadPromises).then(results => {
        const validFiles = results.filter((file): file is File => file !== null);
        const invalidFiles = Array.from(files)
            .filter((file: File) => !validFiles.some(validFile => validFile.name === file.name))
            .map(file => `'${file.name}'`)
            .join(", ");
        if (invalidFiles) {
            // setErrors(["Files had errors. You can check them in the browser console"])  TODO: add to errors bundle
        }
        // Validate number of files
        if (!validFiles || validFiles.length < 3 || validFiles.length > 3) {
            console.error("Wrong number of uploaded files...")
            return null  // TODO: reject(new Error(`Invalid file format: ${file.name}`));
        }
        // (event.target as HTMLInputElement).value = ''; // Reset the file input
        return validFiles
    });
}

function validateFilenames(files: File[], validFilenames: string[]): boolean {
    for (const file of files) {
        const filename = file.name;
        if (!validFilenames.includes(filename)) {
            console.error(`Invalid filename: ${filename}`);
            return false;
        }
    }
    return true;
}
