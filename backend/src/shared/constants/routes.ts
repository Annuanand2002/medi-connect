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
    }
  },
  PATIENT: {
    GETALL: "/patient",
    TOGGLE: "/patient/:id",
  },
} as const;
