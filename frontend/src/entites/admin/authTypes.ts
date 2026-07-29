export interface Admin {
    id : string;
    email : string;
}

 export interface LoginResponse {
    success : boolean;
    message : string;
    result : {
        accessToken : string;
        refreshToken : string;
        admin : Admin
    }
}