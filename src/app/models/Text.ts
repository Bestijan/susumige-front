import { INewsItem } from "../interfaces/INewsItem";

export class Text implements INewsItem {
    text: string = '';
    id!: number;

    constructor(id: number) {
        this.id = id
    }
}