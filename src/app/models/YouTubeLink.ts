import { INewsItem } from "../interfaces/INewsItem";

export class YouTubeLink implements INewsItem {
    link: string = "ЈУ ТЈУБ ЛИНК";
    id!: number;

    constructor(id: number) {
        this.id = id;
    }
}