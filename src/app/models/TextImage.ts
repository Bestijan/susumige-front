import { INewsItem } from "../interfaces/INewsItem";

export class TextImage implements INewsItem {
    id!: number;
    fileName = '';
    fileSize = 0;
    fileAsBase64: string | ArrayBuffer = '';
    fileType = '';
    source = '';

    constructor(textImage: any) {
        Object.assign(this, textImage);
    }
}
