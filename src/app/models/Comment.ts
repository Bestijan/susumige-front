import { TextImage } from "./TextImage";

export class Comment {
    commentNick!: string;
    commentText!: string;
    img!: TextImage;
    
    constructor(comment: any) {
        Object.assign(this, comment);
    }
} 