export class User {
    email!: string;
    firstName!: string;
    id!: string;
    idToken!: string;
    lastName!: string;
    name!: string;
    photoUrl!: string;
    provider!: string;

    constructor(socialUser: any) {
        Object.assign(this, socialUser);
    }
}