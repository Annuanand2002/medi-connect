import { Week } from "../constants/week";
import { RRule } from "rrule";

export const getDayOfWeekFromRRule = (
  recurrenceRule: string,
): Week => {
  const match = recurrenceRule.match(/BYDAY=([A-Z]{2})/);

  if (!match) {
    throw new Error("Invalid recurrence rule");
  }

  const dayMap: Record<string, Week> = {
    MO: "MONDAY",
    TU: "TUESDAY",
    WE: "WEDNESDAY",
    TH: "THURSDAY",
    FR: "FRIDAY",
    SA: "SATURDAY",
    SU: "SUNDAY",
  };

  const day = dayMap[match[1]];

  if (!day) {
    throw new Error("Invalid BYDAY value");
  }

  return day;
};



export const isDateCoveredByRRule = (
  date: Date,
  recurrenceRule: string,
): boolean => {
  const rule = RRule.fromString(recurrenceRule);

  const occurrences = rule.between(
    new Date(date.setHours(0, 0, 0, 0)),
    new Date(date.setHours(23, 59, 59, 999)),
    true,
  );

  return occurrences.length > 0;
};