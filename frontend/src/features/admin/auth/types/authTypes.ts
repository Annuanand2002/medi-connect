export interface Admin {
    id : string;
    email : string;
}

 export interface LoginResponse {
    success : boolean;
    message : string;
    data : {
        accessToken : string;
        refreshToken : string;
        admin : Admin
    }
}