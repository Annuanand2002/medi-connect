import { RRule, Weekday } from "rrule";
import { DoctorAvailability } from "../../domain/entities/doctor/doctorAvailability";

interface CreateRRuleInput {
  startDate: Date;
  endDate: Date;
  days: string[];
}

const dayMap: Record<string, Weekday> = {
  MONDAY: RRule.MO,
  TUESDAY: RRule.TU,
  WEDNESDAY: RRule.WE,
  THURSDAY: RRule.TH,
  FRIDAY: RRule.FR,
  SATURDAY: RRule.SA,
  SUNDAY: RRule.SU,
};

//create
export const createAvailabilityRRule = ({
  startDate,
  endDate,
  days,
}: CreateRRuleInput) => {
  const byweekday = days.map((day) => {
    const weekday = dayMap[day];
    if (!weekday) {
      throw new Error(`Invalid day: ${day}`);
    }
    return weekday;
  });
  const rule = new RRule({
    freq: RRule.WEEKLY,
    dtstart: startDate,
    until: endDate,
    byweekday,
  });
  return rule.toString();
};

//hasAvail

export const hasAvailableDateInRange  = (
    availability : DoctorAvailability[],
    startDate : Date,
    endDate : Date
):boolean=>{
   for(const item  of availability){
    if(!item.recurrenceRule){
        continue;
    }
    const rule = RRule.fromString(item.recurrenceRule);
    const dates = rule.between(startDate,endDate,true);
    if(dates.length >0){
        return true;
    }
   }
   return false
}


interface AvailabilityRuleInput {
  recurrenceRule: string;
  startDate: Date;
  endDate: Date;
}

export const getDatesFromAvailabilityRule = ({
  recurrenceRule,
  startDate,
  endDate,
}: AvailabilityRuleInput): Date[] => {
  const rule = RRule.fromString(recurrenceRule);

  const dates = rule.between(
    startDate,
    endDate,
    true,
  );

  return dates;
};

export const isDateAvailableFromRule = (
  recurrenceRule: string,
  date: Date,
): boolean => {
  const dates = getDatesFromAvailabilityRule({
    recurrenceRule,
    startDate: date,
    endDate: new Date(date.getTime() + 24 * 60 * 60 * 1000),
  });

  const selectedDate = date.toISOString().split("T")[0];

  return dates.some(
    (availableDate) =>
      availableDate.toISOString().split("T")[0] === selectedDate,
  );
};
