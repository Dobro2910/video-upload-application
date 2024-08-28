export interface User {
    userName: string,
    userEmail: string,
    userPassword: string
}

export interface UserWithRole {
    userName: string,
    userEmail: string,
    userPassword: string,
    userRole: string
}

export interface UserLoginCredential {
    userEmail: string,
    userPassword: string
}

export enum UserRole {
    Admin = 'Admin',
    User = 'User',
    Seller = 'Seller'
}