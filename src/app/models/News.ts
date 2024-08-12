import { INewsItem } from "../interfaces/INewsItem";
import { Comment } from "./Comment";
import { TextImage } from "./TextImage"

export class News {

    thumbnail!: TextImage; 
    section!: string;
    title!: string;
    snipet!: string;
    news = new Array<INewsItem>();
    newsId!: string;
    flag!: string;
    views!: number;
    likesNum!: number; 
    commentsNum!: number;
    comments = new Array<Comment>();
    likes = new Array<any>();
    date!: Date;
    nick = '';

    constructor(news: any) {
        Object.assign(this, news);
    }
}