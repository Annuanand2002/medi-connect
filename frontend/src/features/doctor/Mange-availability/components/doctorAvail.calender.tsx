import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import type { DoctorAvailability } from "../types/doctorAvail.type";

interface AvailabilityCalendarProps {
  availability: DoctorAvailability[];
}

const getWeekDay = (date: Date): string => {
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  return days[date.getDay()];
};

const AvailabilityCalendar = ({
  availability,
}: AvailabilityCalendarProps) => {
  const isAvailableDate = (date: Date) => {
    const day = getWeekDay(date);

    return availability.some(
      (item) =>
        item.dayOfWeek === day &&
        item.isAvailable &&
        !item.isDeleted,
    );
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