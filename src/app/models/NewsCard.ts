import { INewsItem } from "../interfaces/INewsItem";
import { TextImage } from "./TextImage";

export class NewsCard implements INewsItem {
    
    newsId!: string;
    id!: number;
    thumbnail!: TextImage;
    title!: string;
    views!: number;
    likes!: number;
    comments!: number;
    date!: Date;
    likesNum!: number;
    commentsNum!: number;

    constructor(newsCard: any) {
        Object.assign(this, newsCard);
    }

}