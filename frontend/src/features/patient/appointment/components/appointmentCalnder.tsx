import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface AppointmentCalendarProps {
  availableDates: string[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const AppointmentCalendar = ({
  availableDates,
  selectedDate,
  onDateSelect,
}: AppointmentCalendarProps) => {
  const isAvailableDate = (date: Date) => {
    return availableDates.some((availableDate) => {
      const parsedDate = new Date(availableDate);

      return (
        parsedDate.getFullYear() === date.getFullYear() &&
        parsedDate.getMonth() === date.getMonth() &&
        parsedDate.getDate() === date.getDate()
      );
    });
  };

  return (
    <div className="appointment-calendar">
      <h3>Select Appointment Date</h3>

      <Calendar
        value={selectedDate}
        onChange={(value) => {
          if (value instanceof Date) {
            onDateSelect(value);
          }
        }}
        tileDisabled={({ date }) => !isAvailableDate(date)}
        tileClassName={({ date }) =>
          isAvailableDate(date)
            ? "appointment-date-available"
            : undefined
        }
      />
    </div>
  );
};

export default AppointmentCalendar;