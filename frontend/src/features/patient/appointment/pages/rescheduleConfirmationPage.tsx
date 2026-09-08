
import { useEffect, useState } from "react";
import "@/styles/patient/appointmnetConfirmation.css";

import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import type { AxiosError } from "axios";

import PatientLayout from "@/layout/PatientLayout";

import type { AppointmentDetails } from "../type/appointmentConfirm";

import {
  getRescheduleAppointmentDetailsApi,
  reschedule,
} from "../api/appointment";

interface ApiResponse {
  success: boolean;
  message: string;
}

const RescheduleConfirmPage = () => {
  const { appointmentId, doctorId } = useParams<{
    appointmentId: string;
    doctorId: string;
  }>();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  // Get selected date and time from URL
  const date = searchParams.get("date");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");

  // Appointment details shown on confirmation page
  const [details, setDetails] =
    useState<AppointmentDetails | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // Reschedule API states
  const [isRescheduling, setIsRescheduling] = useState(false);

  const [rescheduleError, setRescheduleError] =
    useState<string | null>(null);

  const hasValidParams =
    !!appointmentId &&
    !!doctorId &&
    !!date &&
    !!startTime &&
    !!endTime;

  // --------------------------------------------------
  // Fetch appointment details
  // --------------------------------------------------

useEffect(() => {
  if (
    !appointmentId ||
    !doctorId ||
    !date ||
    !startTime ||
    !endTime
  ) {
    return;
  }

  const fetchDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result =
        await getRescheduleAppointmentDetailsApi(
          appointmentId,
          doctorId,
          date,
          startTime,
          endTime,
        );

      setDetails(result);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      setError(
        axiosError.response?.data?.message ||
          "Failed to fetch reschedule details",
      );
    } finally {
      setIsLoading(false);
    }
  };

  fetchDetails();
}, [
  appointmentId,
  doctorId,
  date,
  startTime,
  endTime,
]);

  // --------------------------------------------------
  // Confirm reschedule
  // --------------------------------------------------

  const handleConfirmReschedule = async () => {
    if (
      !appointmentId ||
      !doctorId ||
      !date ||
      !startTime ||
      !endTime
    ) {
      return;
    }

    try {
      setIsRescheduling(true);
      setRescheduleError(null);

      const response = await reschedule(appointmentId, {
        date :new Date(`${date}T00:00:00`),
        startTime,
        endTime,
      });

      console.log("Reschedule successful:", response);

      // Navigate to confirmed page
      navigate(
        `/patient/appointment/RescheduleConfirmed`,
      );
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      setRescheduleError(
        axiosError.response?.data?.message ||
          "Failed to reschedule appointment",
      );
    } finally {
      setIsRescheduling(false);
    }
  };

  // --------------------------------------------------
  // Invalid parameters
  // --------------------------------------------------

  if (!hasValidParams) {
    return (
      <PatientLayout
        title="Confirm Reschedule"
        subtitle="Review your new appointment details."
      >
        <div className="appointment-error">
          Invalid reschedule details
        </div>
      </PatientLayout>
    );
  }

  // --------------------------------------------------
  // Loading details
  // --------------------------------------------------

  if (isLoading) {
    return (
      <PatientLayout
        title="Confirm Reschedule"
        subtitle="Review your new appointment details."
      >
        <div className="appointment-confirmation">
          <div className="appointment-confirmation-card">
            <p>Loading appointment details...</p>
          </div>
        </div>
      </PatientLayout>
    );
  }

  // --------------------------------------------------
  // Error loading details
  // --------------------------------------------------

  if (error || !details) {
    return (
      <PatientLayout
        title="Confirm Reschedule"
        subtitle="Review your new appointment details."
      >
        <div className="appointment-error">
          {error || "Appointment details not found"}
        </div>
      </PatientLayout>
    );
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <PatientLayout
      title="Confirm Reschedule"
      subtitle="Review your new appointment details before confirming."
    >
      <div className="appointment-confirmation-card">

        {/* Header */}

        <div className="appointment-confirmation-header">
          <span>RESCHEDULE SUMMARY</span>

          <h2>Confirm Your Reschedule</h2>

          <p>
            Please review the new date and time before confirming.
          </p>
        </div>

        {/* Doctor */}

        <div className="appointment-detail">
          <span>Doctor</span>

          <strong>
            {details.doctorName}
          </strong>
        </div>

        {/* Doctor Code */}

        <div className="appointment-detail">
          <span>Doctor Code</span>

          <strong>
            {details.doctorCode}
          </strong>
        </div>

        {/* Department */}

        <div className="appointment-detail">
          <span>Department</span>

          <strong>
            {details.department}
          </strong>
        </div>

        {/* New Date */}

        <div className="appointment-detail">
          <span>New Date</span>

          <strong>
            {new Date(details.date).toLocaleDateString()}
          </strong>
        </div>

        {/* New Time */}

        <div className="appointment-detail">
          <span>New Time</span>

          <strong>
            {details.startTime} - {details.endTime}
          </strong>
        </div>

        {/* Reschedule Error */}

        {rescheduleError && (
          <div className="appointment-error">
            {rescheduleError}
          </div>
        )}

        {/* Confirm Button */}

        <button
          type="button"
          className="confirm-appointment-button"
          onClick={handleConfirmReschedule}
          disabled={isRescheduling}
        >
          {isRescheduling
            ? "Rescheduling..."
            : "Confirm Reschedule"}
        </button>

      </div>
    </PatientLayout>
  );
};

export default RescheduleConfirmPage;

