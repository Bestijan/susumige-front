import { INewsItem } from "../interfaces/INewsItem";

export class TextLink implements INewsItem {
    link: string = "ЛИНК";
    id!: number;

    constructor(id: number) {
        this.id = id;
    }
} 