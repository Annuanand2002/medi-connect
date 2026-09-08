export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    LOGOUT: "/logout",
    REFRESH_TOKEN: "/refresh-token",
  },

  DOCTOR: {
    REQUEST: "/doctor-request",
    PROFILE: "/profile",
    GETALL: "/doctor",
    TOGGLE: "/doctor/:id",
    GET: "/doctorAvail",
    CREATE: "/doctorAvail/create",
    UPDATE: "/doctorAvail/:id",
    CREATELEAVE : '/doctorLeave/create',
    UPDATELEAVE : '/doctorLeave/update/:id',
    GETLEAVE : "/doctorLeave",
    BLOCK : {
      CREATE : '/doctorBlock/create',
      UPDATE :'/doctorBlock/:id',
      GET : '/doctorBlock'
    },
    APPOINTMENT : {
      GET :'/appointment'
    }
  },
  PATIENT: {
    GETALL: "/patient",
    TOGGLE: "/patient/:id",
    DOCTOTLIST : '/doctors',
    GETDATES : '/dates/:doctorId',
    GETTIMESLOT : '/timeslots/:doctorId',
    GETDETAIlS : '/appointment/:doctorId/details',
    APPOINTMENT : {
      CREATE : '/appointment/create',
      GET : '/appointment',
      GETPAGE : '/appointment/:appointmentId',
      CANCEL : '/appointment/cancel/:id',
      RESCHEDULE :{
        DATE : '/appointment/reschedule/dates/:doctorId',
        TIMESLOT : "/appointment/reschedule/time-slots/:doctorId",
        UPDATE : '/appointment/reschedule/:appointmentId',
        CONFIRM : '/appointment/reschedule/:doctorId'
      } 
    }
  },
} as const;
