import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import type { DoctorAvailability} from "../types/doctorAvail.type";
import { Week} from "../types/doctorAvail.type";


interface AvailabilityCalendarProps {
  availability: DoctorAvailability[];
}

const getWeekDay = (date: Date): Week => {
  const days: Week[] = [
    Week.SUN,
    Week.MON,
    Week.TUES,
    Week.WED,
    Week.THURS,
    Week.FRI,
    Week.SAT,
  ];

  return days[date.getDay()];
};

const isDateWithinRange = (
  date: Date,
  startDate: string,
  endDate: string,
): boolean => {
  const current = new Date(date);
  current.setHours(0, 0, 0, 0);

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  return current >= start && current <= end;
};

const AvailabilityCalendar = ({
  availability,
}: AvailabilityCalendarProps) => {
  const isAvailableDate = (date: Date): boolean => {
    const day = getWeekDay(date);

    return availability.some((item) => {
      if (!item.isAvailable || item.isDeleted) {
        return false;
      }

      // Check day of week
      if (item.dayOfWeek !== day) {
        return false;
      }

      // Check date range
      if (
        !item.startDate ||
        !item.endDate
      ) {
        return false;
      }

      return isDateWithinRange(
        date,
        item.startDate,
        item.endDate,
      );
    });
  };

  return (
    <div className="availability-calendar">
      <Calendar
        tileClassName={({ date }) =>
          isAvailableDate(date)
            ? "availability-date"
            : undefined
        }
      />
    </div>
  );
};

export default AvailabilityCalendar;