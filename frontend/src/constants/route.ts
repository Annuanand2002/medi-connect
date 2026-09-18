export const ROUTES = {
    ADMIN : {
        AUTH : {
            LOGIN:"/admin/login",
            LOGOUT : "/admin/logout",
            REFRESH_TOKEN : "/admin/refresh-token"
        },
       
        DOCTORREQUEST : {
             APPROVE : '/admin/doctor-request/approve',
            GETREQUESTS : "/admin/doctor-request",
            GETREQUEST : "/admin/doctor-request",
            REJECT : "/admin/doctor-request/reject"
        },
        DOCTOR : {
            GET : "/admin/doctor"
        },
        PATIENT : {
            GET : "/admin/patient"
        }
    },
    DOCTOR : {
        AUTH : {
            LOGIN:"/doctor/login",
            LOGOUT : "/doctor/logout",
            REFRESH_TOKEN : "/doctor/refresh-token"
        },
        DOCTORREQUEST : {
            APPLY : "/doctor/apply",
            GET : "/doctor/retry"
        },
        PASSWORD : {
            REQUEST : "/doctor/request-resetpassword",
            RESET : "/doctor/reset-password"
        },
        BLOCK : {
            GET :  "/doctor/doctorBlock",
            CREATE : "/doctor/doctorBlock/create",
            UPDATE : "/doctor/doctorBlock"
        },
        LEAVE : {
            GET : "/doctor/doctorLeave",
            CREATE : "/doctor/doctorLeave/create",
            UPDATE : "/doctor/doctorLeave/update"
        },
        AVAIL : {
            GET : "/doctor/doctorAvail",
            CREATE : "/doctor/doctorAvail/create",
            UPDATE : "/doctor/doctorAvail"
        }
    },
    PATIENT : {
                AUTH : {
            LOGIN:"/patient/login",
            LOGOUT : "/patient/logout",
            REFRESH_TOKEN : "/patient/refresh-token"
        },
        REGISTER : {
            CREATE :"/patient/create-patient",
            VERIFY : "/patient/verify-otp"
        },
        PASSWORD : {
            REQUEST : "/patient/requeset-reset",
            RESET : "/patient/reset-password"
        },
        APPOINTMENT : {
            GET : "/patient/doctors",
            DATES : "/patient/dates",
            TIMESLOT : "/patient/timeslots",
            DETAILS : "/patient/appointment",
            CREATE : "/patient/appointment/create",
            CANCEL : "/patient/appointment/cancel",
            RESCHEDULE : {
                DATE : "reschedule/dates",
                TIMESLOT : "/patient/appointment/reschedule/time-slots",
                GET : "/patient/appointment/reschedule",
                CONFIRM : "/patient/appointment/reschedule"
            }

        }
    }
} as const