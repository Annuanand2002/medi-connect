import { useEffect, useState } from "react";
import "@/styles/patient/appointmnetConfirmation.css"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import type { AxiosError } from "axios";

import PatientLayout from "@/layout/PatientLayout";
import type { AppointmentDetails } from "../type/appointmentConfirm";
import {
  createAppointmentApi,
  getAppointmentDetailsApi,
} from "../api/appointment";
import type { CreateAppointmentRequest } from "../type/createAppointment.type";

interface ApiResponse {
  success: boolean;
  message: string;
}

const ConfirmationPage = () => {
  const { doctorId } = useParams<{
    doctorId: string;
  }>();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const date = searchParams.get("date");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");

  const [details, setDetails] = useState<AppointmentDetails | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const hasValidParams = !!doctorId && !!date && !!startTime && !!endTime;

  useEffect(() => {
    if (!doctorId || !date || !startTime || !endTime) {
      return;
    }

    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await getAppointmentDetailsApi(
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
            "Failed to fetch appointment details",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [doctorId, date, startTime, endTime]);
  const handleConfirmAppointment = async () => {
    if (!details) {
      return;
    }

    try {
      setIsCreating(true);
      setCreateError(null);

      const data: CreateAppointmentRequest = {
        doctorId: details.doctorId,
        date: details.date,
        startTime: details.startTime,
        endTime: details.endTime,
      };

      const result = await createAppointmentApi(data);

      navigate("/patient/appointment/confirmed", {
        state: {
          appointment: result,
        },
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      setCreateError(
        axiosError.response?.data?.message || "Failed to create appointment",
      );
    } finally {
      setIsCreating(false);
    }
  };

  // Invalid URL parameters
  if (!hasValidParams) {
    return (
      <PatientLayout
        title="Confirm Appointment"
        subtitle="Review your appointment details."
      >
        <div className="appointment-error">Invalid appointment details</div>
      </PatientLayout>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <PatientLayout
        title="Confirm Appointment"
        subtitle="Review your appointment details."
      >
        <div className="appointment-confirmation">
          <div className="appointment-confirmation-card">
            <p>Loading appointment details...</p>
          </div>
        </div>
      </PatientLayout>
    );
  }

  // Error
  if (error || !details) {
    return (
      <PatientLayout
        title="Confirm Appointment"
        subtitle="Review your appointment details."
      >
        <div className="appointment-error">
          {error || "Appointment details not found"}
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout
      title="Confirm Appointment"
      subtitle="Review your appointment details before confirming."
    >
      <div className="appointment-confirmation-card">
        <div className="appointment-confirmation-header">
          <span>APPOINTMENT SUMMARY</span>
          <h2>Confirm Your Appointment</h2>
          <p>Please review the details before booking.</p>
        </div>

        <div className="appointment-detail">
          <span>Doctor</span>
          <strong>{details.doctorName}</strong>
        </div>

        <div className="appointment-detail">
          <span>Doctor Code</span>
          <strong>{details.doctorCode}</strong>
        </div>

        <div className="appointment-detail">
          <span>Department</span>
          <strong>{details.department}</strong>
        </div>

        <div className="appointment-detail">
          <span>Date</span>
          <strong>{new Date(details.date).toLocaleDateString()}</strong>
        </div>

        <div className="appointment-detail">
          <span>Time</span>
          <strong>
            {details.startTime} - {details.endTime}
          </strong>
        </div>

        {createError && <div className="appointment-error">{createError}</div>}

        <button
          type="button"
          className="confirm-appointment-button"
          onClick={handleConfirmAppointment}
          disabled={isCreating}
        >
          {isCreating ? "Booking Appointment..." : "Confirm Appointment"}
        </button>
      </div>
    </PatientLayout>
  );
};

export default ConfirmationPage;
