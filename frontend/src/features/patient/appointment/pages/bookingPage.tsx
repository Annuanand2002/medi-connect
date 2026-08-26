import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PatientLayout from "@/layout/PatientLayout";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

import { fetchAvailableDates } from "../redux/getDates.Thunk";
import AppointmentCalendar from "../components/appointmentCalnder";
import DateRangeFilter from "../components/DateFilter";


import type { AvailableTimeSlot } from "../type/appointmentTime";
import { fetchTimeSlots } from "../redux/appointmentSlot.thunk";
import { selectTimeSlot } from "../redux/appointmentSlot.slice";
import TimeSlot from "../components/appointmentTimeSlot";

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getCurrentMonthRange = () => {
  const today = new Date();

  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    1,
  );

  const end = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  );

  return {
    startDate: formatDate(start),
    endDate: formatDate(end),
  };
};

const AppointmentBookingPage = () => {
  const { doctorId } = useParams<{ doctorId: string }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    dates,
    isLoading: dateLoading,
    error: dateError,
  } = useAppSelector(
    (state) => state.appointmentDate,
  );

 const {
  slots,
  selectedStartTime,
  selectedEndTime,
  isLoading: timeSlotLoading,
  error: timeSlotError,
} = useAppSelector((state) => state.timeSlots);

  const currentMonth = getCurrentMonthRange();

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  const [startDate, setStartDate] = useState(
    currentMonth.startDate,
  );

  const [endDate, setEndDate] = useState(
    currentMonth.endDate,
  );

  // Fetch current month's available dates
  useEffect(() => {
    if (!doctorId) return;

    const today = new Date();

    const start = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    );

    const end = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    );

    dispatch(
      fetchAvailableDates({
        doctorId,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      }),
    );
  }, [doctorId, dispatch]);

  // Apply custom date range
  const handleApplyDateRange = () => {
    if (!doctorId || !startDate || !endDate) {
      return;
    }

    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T23:59:59`);

    if (start > end) {
      return;
    }

    setSelectedDate(null);

    dispatch(
      fetchAvailableDates({
        doctorId,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      }),
    );
  };

  // Select calendar date
  const handleDateSelect = (date: Date) => {
    if (!doctorId) return;

    setSelectedDate(date);

    const formattedDate = formatDate(date);

    dispatch(
      fetchTimeSlots({
        doctorId,
        date: formattedDate,
      }),
    );
  };

  // Select time slot
  const handleTimeSelect = (
    slot: AvailableTimeSlot,
  ) => {
    dispatch(selectTimeSlot(slot));
  };

  const availableDates = dates.map(
    (item) => item.date,
  );
  const handleConfirm = () => {
  if (!doctorId || !selectedDate || !selectedStartTime || !selectedEndTime) {
    return;
  }

  const date = formatDate(selectedDate);

  navigate(
    `/patient/appointment/${doctorId}/details?date=${date}&startTime=${selectedStartTime}&endTime=${selectedEndTime}`,
  );
};

  return (
    <PatientLayout
      title="Book Appointment"
      subtitle="Select an available date and time for your appointment."
    >
      <div className="appointment-booking-page">

        {dateError && (
          <div className="appointment-error">
            {dateError}
          </div>
        )}

        {timeSlotError && (
          <div className="appointment-error">
            {timeSlotError}
          </div>
        )}

        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onApply={handleApplyDateRange}
        />

        <div className="appointment-booking-content">

          {/* Calendar */}
          <AppointmentCalendar
            availableDates={availableDates}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />

          {dateLoading && (
            <p>Loading available dates...</p>
          )}

          {/* Time slots */}
          <TimeSlot
            slots={slots}
            selectedStartTime={selectedStartTime}
            selectedDate={selectedDate}
            onSelect={handleTimeSelect}
            isLoading={timeSlotLoading}
          />
          {selectedStartTime && selectedEndTime && (
  <button
    type="button"
    onClick={handleConfirm}
    className="confirm-appointment-button"
  >
    Confirm Appointment
  </button>
)}

        </div>

      </div>
    </PatientLayout>
  );
};

export default AppointmentBookingPage;