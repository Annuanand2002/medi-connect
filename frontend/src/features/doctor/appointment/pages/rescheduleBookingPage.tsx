import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "@/styles/patient/appointmentBooking.css";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

import { fetchDoctorRescheduleAvailableDates } from "../redux/reschdeuleDate.thunk";
import { fetchDoctorRescheduleTimeSlots } from "../redux/reschdeuleTime.thunk";

import DateRangeFilter from "@/features/patient/appointment/components/DateFilter";
import AppointmentCalendar from "@/features/patient/appointment/components/appointmentCalnder";
import TimeSlot from "@/features/patient/appointment/components/appointmentTimeSlot";

import DoctorLayout from "@/layout/DoctorLayout";

import type { DoctorAvailableTimeSlot } from "../types/appointmentTime";
import { selectDoctorTimeSlot } from "../redux/rescheduleTime.slice";

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

const DoctorReschedulePage = () => {
  const { appointmentId } = useParams<{
    appointmentId: string;
  }>();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  /*
   * -----------------------------------------
   * DOCTOR AVAILABLE DATES
   * -----------------------------------------
   */

  const {
    dates,
    isLoading: dateLoading,
    error: dateError,
  } = useAppSelector(
    (state) => state.appointmentDoctorDate,
  );

  /*
   * -----------------------------------------
   * DOCTOR TIME SLOTS
   * -----------------------------------------
   */

  const {
    timeSlots,
    selectedStartTime,
    selectedEndTime,
    isLoading: timeSlotLoading,
    error: timeSlotError,
  } = useAppSelector(
    (state) => state.appointmentDoctorTime,
  );

  /*
   * -----------------------------------------
   * CURRENT MONTH
   * -----------------------------------------
   */

  const currentMonth = getCurrentMonthRange();

  /*
   * -----------------------------------------
   * SELECTED DATE
   * -----------------------------------------
   */

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  /*
   * -----------------------------------------
   * DATE RANGE
   * -----------------------------------------
   */

  const [startDate, setStartDate] = useState(
    currentMonth.startDate,
  );

  const [endDate, setEndDate] = useState(
    currentMonth.endDate,
  );

  /*
   * -----------------------------------------
   * FETCH INITIAL AVAILABLE DATES
   * -----------------------------------------
   */

  useEffect(() => {
    console.log("USE EFFECT RUNNING");
    console.log("appointmentId:", appointmentId);

    if (!appointmentId) {
      console.log("NO APPOINTMENT ID");
      return;
    }

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

    console.log("ABOUT TO DISPATCH");

    dispatch(
      fetchDoctorRescheduleAvailableDates({
        appointmentId,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      }),
    );
  }, [appointmentId, dispatch]);

  /*
   * -----------------------------------------
   * APPLY DATE RANGE
   * -----------------------------------------
   */

  const handleApplyDateRange = () => {
    if (!appointmentId || !startDate || !endDate) {
      return;
    }

    const start = new Date(
      `${startDate}T00:00:00`,
    );

    const end = new Date(
      `${endDate}T23:59:59`,
    );

    if (start > end) {
      return;
    }

    // Clear previously selected date
    setSelectedDate(null);

    // Fetch available dates again
    dispatch(
      fetchDoctorRescheduleAvailableDates({
        appointmentId,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      }),
    );
  };

  /*
   * -----------------------------------------
   * SELECT DATE
   * -----------------------------------------
   */

  const handleDateSelect = (date: Date) => {
    if (!appointmentId) {
      return;
    }

    console.log("Selected date:", date);

    setSelectedDate(date);

    const formattedDate = formatDate(date);

    console.log(
      "Fetching time slots for:",
      formattedDate,
    );

    dispatch(
      fetchDoctorRescheduleTimeSlots(
        formattedDate,
      ),
    );
  };

  /*
   * -----------------------------------------
   * SELECT TIME SLOT
   * -----------------------------------------
   */

  const handleTimeSelect = (
    slot: DoctorAvailableTimeSlot,
  ) => {
    console.log("Selected time slot:", slot);

    dispatch(
      selectDoctorTimeSlot(slot),
    );
  };

  /*
   * -----------------------------------------
   * AVAILABLE DATES
   * -----------------------------------------
   */

  const availableDates = dates.map(
    (item) => item.date,
  );

  /*
   * -----------------------------------------
   * GO TO CONFIRMATION PAGE
   * -----------------------------------------
   */

  const handleConfirm = () => {
    if (
      !appointmentId ||
      !selectedDate ||
      !selectedStartTime ||
      !selectedEndTime
    ) {
      return;
    }

    const date = formatDate(selectedDate);

    console.log("Going to confirmation page");

    console.log("Appointment ID:", appointmentId);
    console.log("Selected Date:", date);
    console.log(
      "Start Time:",
      selectedStartTime,
    );
    console.log(
      "End Time:",
      selectedEndTime,
    );

    navigate(
      `/doctor/appointments/reschedule/confirm/${appointmentId}?date=${date}&startTime=${selectedStartTime}&endTime=${selectedEndTime}`,
    );
  };

  return (
    <DoctorLayout
      title="Reschedule Appointment"
      subtitle="Select a new date and time for your appointment."
    >
      <div className="appointment-booking-page">

        {/* -----------------------------------------
            DATE API ERROR
        ----------------------------------------- */}

        {dateError && (
          <div className="appointment-error">
            {dateError}
          </div>
        )}

        {/* -----------------------------------------
            TIME SLOT API ERROR
        ----------------------------------------- */}

        {timeSlotError && (
          <div className="appointment-error">
            {timeSlotError}
          </div>
        )}

        {/* -----------------------------------------
            DATE RANGE FILTER
        ----------------------------------------- */}

        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onApply={handleApplyDateRange}
        />

        <div className="appointment-booking-content">

          {/* -----------------------------------------
              CALENDAR
          ----------------------------------------- */}

          <AppointmentCalendar
            availableDates={availableDates}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />

          {/* -----------------------------------------
              DATE LOADING
          ----------------------------------------- */}

          {dateLoading && (
            <p>
              Loading available dates...
            </p>
          )}

          {/* -----------------------------------------
              TIME SLOTS
          ----------------------------------------- */}

          <TimeSlot
            slots={timeSlots}
            selectedStartTime={
              selectedStartTime
            }
            selectedDate={selectedDate}
            onSelect={handleTimeSelect}
            isLoading={timeSlotLoading}
          />

          {/* -----------------------------------------
              CONFIRM RESCHEDULE BUTTON
          ----------------------------------------- */}

          {selectedStartTime &&
            selectedEndTime && (
              <button
                type="button"
                onClick={handleConfirm}
                className="confirm-appointment-button"
              >
                Confirm Reschedule
              </button>
            )}

        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorReschedulePage;