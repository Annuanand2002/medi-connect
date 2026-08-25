export const Week = {
  MON: "MONDAY",
  TUES: "TUESDAY",
  WED: "WEDNESDAY",
  THURS: "THURSDAY",
  FRI: "FRIDAY",
  SAT: "SATURDAY",
  SUN: "SUNDAY",
} as const;

export type Week = (typeof Week)[keyof typeof Week];

