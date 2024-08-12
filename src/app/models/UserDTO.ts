import { TextImage } from "./TextImage";

export class UserDTO {
    comment!: string
    commentNick!: string;
    img!: TextImage;
    newsId!: string; 

    constructor(userDTO: any) {
        Object.assign(this, userDTO);
    }
}