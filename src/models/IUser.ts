export interface IUser
{
    id: number;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    userName: string;
    email: string;
    emailConfirmed: boolean;
    phoneNumber:string;
    phoneNumberConfirmed: boolean;
    mainPhoto: number;
}

