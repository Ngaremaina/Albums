export interface UserResponse{
    id: number,
    name : string,
    emailAddress: string,
    username: string
}

export interface LoginResponse extends UserResponse{
    token: string
}