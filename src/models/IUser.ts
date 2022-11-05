export interface IUser
{
    _id: number;
    firstName: string;
    lastName: string;
    createdAt: Date;
    _updatedAt: Date;
    userName: string;
    email: string;
    _emailConfirmed: boolean;
    phoneNumber:string;
    _phoneNumberConfirmed: boolean;
    _mainPhoto: number;
}

export interface IGenericResponse 
{
    status: string;
    message: string;
}