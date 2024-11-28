export interface UserResponse{
    userResponse:{
        id?: number,
        name : string,
        emailAddress: string,
        username: string
    }
}

export interface LoginResponse extends UserResponse{
    token: string
}

export interface UserDetailsResponse extends UserResponse{
    albumResponseList?: [];
}