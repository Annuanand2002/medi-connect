export interface Doctor {
    id : string;
    email : string;
    fullName : string;
    profileImg : string;
}

 export interface LoginDoctorResponse {
    success : boolean;
    message : string;
    result : {
        accessToken : string;
        refreshToken : string;
        doctor : Doctor
    }
}