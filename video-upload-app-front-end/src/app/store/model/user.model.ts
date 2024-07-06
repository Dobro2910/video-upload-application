export interface User {
    userName: string,
    userEmail: string,
    userPassword: string
}

export interface UserLoginCredential {
    userEmail: string,
    userPassword: string
}