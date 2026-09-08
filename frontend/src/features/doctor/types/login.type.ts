export interface Doctor {
    id : string;
    email : string;
    fullName : string;
    profileImg : string;
}

 export interface LoginDoctorResponse {
    success : boolean;
    message : string;
    data : {
        accessToken : string;
        refreshToken : string;
        doctor : Doctor
    }
}