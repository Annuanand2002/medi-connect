import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "@/styles/patient/appointmentBooking.css";

import PatientLayout from "@/layout/PatientLayout";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

import { fetchAvailableDates } from "../redux/getDates.Thunk";
import { fetchRescheduleAvailableDates } from "../redux/resceduleDate.thunk";

import AppointmentCalendar from "../components/appointmentCalnder";
import DateRangeFilter from "../components/DateFilter";

import type { AvailableTimeSlot } from "../type/appointmentTime";

import {
  fetchTimeSlots,
} from "../redux/appointmentSlot.thunk";

import { selectTimeSlot } from "../redux/appointmentSlot.slice";
import TimeSlot from "../components/appointmentTimeSlot";
import { fetchRescheduleTimeSlots } from "../redux/reschdeuleSlot.thunk";

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getCurrentMonthRange = () => {
  const today = new Date();

  const start = new Date(today.getFullYear(), today.getMonth(), 1);

  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return {
    startDate: formatDate(start),
    endDate: formatDate(end),
  };
};

const AppointmentBookingPage = () => {
  /*
   * Normal booking URL:
   * /patient/appointment/dates/:doctorId
   *
   * Reschedule URL:
   * /patient/appointment/reschedule/:appointmentId/dates/:doctorId
   */

  const { doctorId, appointmentId } = useParams<{
    doctorId: string;
    appointmentId?: string;
  }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /*
   * If appointmentId exists,
   * this page is being used for rescheduling.
   */
  const isRescheduling = Boolean(appointmentId);

  /*
   * Available dates state
   */
  const {
    dates,
    isLoading: dateLoading,
    error: dateError,
  } = useAppSelector((state) => state.appointmentDate);

  /*
   * Available time slots state
   */
  const {
    slots,
    selectedStartTime,
    selectedEndTime,
    isLoading: timeSlotLoading,
    error: timeSlotError,
  } = useAppSelector((state) => state.timeSlots);

  /*
   * Current month
   */
  const currentMonth = getCurrentMonthRange();

  /*
   * Selected calendar date
   */
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  /*
   * Date range filter
   */
  const [startDate, setStartDate] = useState(currentMonth.startDate);

  const [endDate, setEndDate] = useState(currentMonth.endDate);

  useEffect(() => {
    if (!doctorId) {
      return;
    }

    const today = new Date();

    const start = new Date(today.getFullYear(), today.getMonth(), 1);

    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    if (appointmentId) {
      /*
       * RESCHEDULE
       */
      dispatch(
        fetchRescheduleAvailableDates({
          appointmentId,
          params: {
            doctorId,
            startDate: start.toISOString(),
            endDate: end.toISOString(),
          },
        }),
      );
    } else {
      /*
       * NORMAL BOOKING
       */
      dispatch(
        fetchAvailableDates({
          doctorId,
          startDate: start.toISOString(),
          endDate: end.toISOString(),
        }),
      );
    }
  }, [doctorId, appointmentId, dispatch]);

  /*
   * ------------------------------------------------
   * APPLY DATE RANGE
   * ------------------------------------------------
   */
  const handleApplyDateRange = () => {
    if (!doctorId || !startDate || !endDate) {
      return;
    }

    const start = new Date(`${startDate}T00:00:00`);

    const end = new Date(`${endDate}T23:59:59`);

    if (start > end) {
      return;
    }

    /*
     * Clear previously selected date
     */
    setSelectedDate(null);

    /*
     * RESCHEDULE
     */
    if (appointmentId) {
      dispatch(
        fetchRescheduleAvailableDates({
          appointmentId,
          params: {
            doctorId,
            startDate: start.toISOString(),
            endDate: end.toISOString(),
          },
        }),
      );
    } else {
      /*
       * NORMAL BOOKING
       */
      dispatch(
        fetchAvailableDates({
          doctorId,
          startDate: start.toISOString(),
          endDate: end.toISOString(),
        }),
      );
    }
  };


  const handleDateSelect = (date: Date) => {
    if (!doctorId) {
      return;
    }

    /*
     * Store selected date
     */
    setSelectedDate(date);

    /*
     * Convert Date object to YYYY-MM-DD
     */
    const formattedDate = formatDate(date);

    /*
     * RESCHEDULE
     */
    if (appointmentId) {
      dispatch(
        fetchRescheduleTimeSlots({
          doctorId,
          date: formattedDate,
        }),
      );
    } else {
      /*
       * NORMAL BOOKING
       */
      dispatch(
        fetchTimeSlots({
          doctorId,
          date: formattedDate,
        }),
      );
    }
  };

  /*
   * ------------------------------------------------
   * SELECT TIME SLOT
   * ------------------------------------------------
   */
  const handleTimeSelect = (slot: AvailableTimeSlot) => {
    dispatch(selectTimeSlot(slot));
  };

  /*
   * ------------------------------------------------
   * AVAILABLE DATES
   * ------------------------------------------------
   */
  const availableDates = dates.map((item) => item.date);
  console.log("API dates:", dates);
console.log("Available dates:", availableDates);

  /*
   * ------------------------------------------------
   * CONFIRM DATE + TIME
   * ------------------------------------------------
   */
  const handleConfirm = () => {
    if (!doctorId || !selectedDate || !selectedStartTime || !selectedEndTime) {
      return;
    }

    const date = formatDate(selectedDate);

    /*
     * RESCHEDULE
     */
    if (isRescheduling && appointmentId) {
  navigate(
    `/patient/appointment/${appointmentId}/${doctorId}/reschedule-details?date=${date}&startTime=${selectedStartTime}&endTime=${selectedEndTime}`,
  );
    } else {
      /*
       * NORMAL BOOKING
       */
      navigate(
        `/patient/appointment/${doctorId}/details?date=${date}&startTime=${selectedStartTime}&endTime=${selectedEndTime}`,
      );
    }
  };

  return (
    <PatientLayout
      title={isRescheduling ? "Reschedule Appointment" : "Book Appointment"}
      subtitle={
        isRescheduling
          ? "Select a new date and time for your appointment."
          : "Select an available date and time for your appointment."
      }
    >
      <div className="appointment-booking-page">
        {/* -----------------------------------------
            DATE API ERROR
        ------------------------------------------ */}
        {dateError && <div className="appointment-error">{dateError}</div>}

        {/* -----------------------------------------
            TIME SLOT API ERROR
        ------------------------------------------ */}
        {timeSlotError && (
          <div className="appointment-error">{timeSlotError}</div>
        )}

        {/* -----------------------------------------
            DATE RANGE FILTER
        ------------------------------------------ */}
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onApply={handleApplyDateRange}
        />

        <div className="appointment-booking-content">
          {/* ---------------------------------------
              CALENDAR
          ---------------------------------------- */}
          <AppointmentCalendar
            availableDates={availableDates}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />

          {/* ---------------------------------------
              DATE LOADING
          ---------------------------------------- */}
          {dateLoading && <p>Loading available dates...</p>}

          {/* ---------------------------------------
              TIME SLOTS
          ---------------------------------------- */}
          <TimeSlot
            slots={slots}
            selectedStartTime={selectedStartTime}
            selectedDate={selectedDate}
            onSelect={handleTimeSelect}
            isLoading={timeSlotLoading}
          />

          {/* ---------------------------------------
              CONFIRM BUTTON
          ---------------------------------------- */}
          {selectedStartTime && selectedEndTime && (
            <button
              type="button"
              onClick={handleConfirm}
              className="confirm-appointment-button"
            >
              {isRescheduling ? "Confirm Reschedule" : "Confirm Appointment"}
            </button>
          )}
        </div>
      </div>
    </PatientLayout>
  );
};

export default AppointmentBookingPage;
