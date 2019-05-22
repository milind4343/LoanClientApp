export class AuthModel {
    roleId: number;
    role:string;
    accesstoken:string;
}

export class ActiveLink {;
    title:string;
    icon:string;
    link:string;
    home:boolean;
    children:Array<ActiveLink>;
}