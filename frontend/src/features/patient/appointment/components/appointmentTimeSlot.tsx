import { Clock } from "lucide-react";
import type { AvailableTimeSlot } from "../type/appointmentTime";

interface TimeSlotProps {
  slots: AvailableTimeSlot[];
  selectedStartTime: string | null;
  onSelect: (slot: AvailableTimeSlot) => void;
  isLoading: boolean;
  selectedDate: Date | null;
}

const TimeSlot = ({
  slots,
  selectedStartTime,
  onSelect,
  isLoading,
  selectedDate,
}: TimeSlotProps) => {
  if (!selectedDate) {
    return (
      <div className="time-slot-empty">
        <Clock size={24} />

        <h3>Select a date</h3>

        <p>
          Select an available date from the calendar to see available
          time slots.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="time-slot-section">
        <h3>Available Time</h3>
        <p>Loading available times...</p>
      </div>
    );
  }

  if (!slots.length) {
    return (
      <div className="time-slot-empty">
        <Clock size={24} />

        <h3>No available time</h3>

        <p>
          There are no available time slots for the selected date.
        </p>
      </div>
    );
  }

  return (
    <div className="time-slot-section">
      <div className="time-slot-header">
        <Clock size={20} />

        <div>
          <h3>Available Time</h3>
          <p>Select a time for your appointment</p>
        </div>
      </div>

      <div className="time-slot-grid">
        {slots
          .filter((slot) => slot.isAvailable)
          .map((slot) => {
            const isSelected =
              selectedStartTime === slot.startTime;

            return (
              <button
                key={`${slot.startTime}-${slot.endTime}`}
                type="button"
                className={`time-slot ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => onSelect(slot)}
              >
                {slot.startTime} - {slot.endTime}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default TimeSlot;
