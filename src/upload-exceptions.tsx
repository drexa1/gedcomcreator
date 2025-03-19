export class UploadError extends Error {
    public literal: string;
    public details: any;

    constructor(message: string, literal: string, details: any) {
        super(message);
        this.literal = literal;
        this.details = details;
    }
}

export class InvalidFilenamesError extends UploadError {
    constructor(invalidFilenames: string[]) {
        super("These don't seem to be our templates: {filenames}", "dropzone.upload.invalid.filenames", { filenames: invalidFilenames.join(', ') });
    }
}

export class TooManyFilesError extends UploadError {
    constructor(filesLength: number) {
        super("We only need our 3 templates", "dropzone.upload.too.many", filesLength);
    }
}