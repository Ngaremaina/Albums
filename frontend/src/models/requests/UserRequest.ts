export interface RegisterRequest extends LoginRequest{
    name:string,
    username:string,
}

export interface LoginRequest{
    emailAddress:string,
    password:string
}

