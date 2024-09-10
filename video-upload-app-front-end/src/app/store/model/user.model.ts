export interface User {
    userName: string;
    userEmail: string;
    userPassword: string;
    userRole?: string;
    userImage?: string;
}

export interface UpdateUser {
    userName?: string;
    userEmail?: string;
    userImage?: File;
}

export interface UserLoginCredential {
    userEmail: string;
    userPassword: string;
}

export enum UserRole {
    Admin = 'Admin',
    User = 'User',
    Seller = 'Seller'
}