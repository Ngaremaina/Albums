export interface LoginUserValidationErrors {
    emailAddress: string;
    password: string;
}

export interface RegisterUserErrors extends LoginUserValidationErrors{
    name: string;
    username: string;
    emailAddress: string;
    password: string;
}

