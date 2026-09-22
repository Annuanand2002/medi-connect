import { useEffect, useState } from "react";

import "@/styles/patient/appointmnetConfirmation.css";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import type { AxiosError } from "axios";

import DoctorLayout from "@/layout/DoctorLayout";

import { getDoctorRescheduleAppointmentDetailsApi, reschedule } from "../api/appointment";
import type { DcotorAppointmentDetails } from "../types/appointmentConfirm";

interface ApiResponse {
  success: boolean;
  message: string;
}

const DoctorRescheduleConfirmationPage = () => {
  const { appointmentId } = useParams<{
    appointmentId: string;
  }>();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  const [details, setDetails] = useState<DcotorAppointmentDetails | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [isRescheduling, setIsRescheduling] = useState(false);

  const [rescheduleError, setRescheduleError] = useState<string | null>(null);

  /*
   * -----------------------------------------
   * GET SELECTED DATE AND TIME
   * -----------------------------------------
   */

  const date = searchParams.get("date");

  const startTime = searchParams.get("startTime");

  const endTime = searchParams.get("endTime");

  /*
   * -----------------------------------------
   * VALIDATE PARAMETERS
   * -----------------------------------------
   */

  const hasValidParams = !!appointmentId && !!date && !!startTime && !!endTime;

  /*
   * -----------------------------------------
   * FETCH APPOINTMENT DETAILS
   * -----------------------------------------
   */

  useEffect(() => {
    if (!appointmentId || !date || !startTime || !endTime) {
      return;
    }

    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await getDoctorRescheduleAppointmentDetailsApi(
          appointmentId,
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
  }, [appointmentId, date, startTime, endTime]);

  /*
   * -----------------------------------------
   * FINAL RESCHEDULE
   * -----------------------------------------
   */

const handleConfirmReschedule = async () => {
  console.log("🔥 CONFIRM BUTTON CLICKED");

  if (!appointmentId || !date || !startTime || !endTime) {
    console.log("❌ Missing values:", {
      appointmentId,
      date,
      startTime,
      endTime,
    });
    return;
  }

  console.log("✅ All values exist");

  try {
    setIsRescheduling(true);
    setRescheduleError(null);

    console.log("🚀 Calling reschedule API");

    const result = await reschedule(appointmentId, {
      date: new Date(`${date}T00:00:00`),
      startTime,
      endTime,
    });

    console.log("✅ RESCHEDULE RESPONSE:", result);

    navigate("/doctor/appointments/rescheduled", {
      state: {
        appointment: result,
      },
    });
  } catch (error) {
    console.log("❌ RESCHEDULE ERROR:", error);

    const axiosError = error as AxiosError<ApiResponse>;

    setRescheduleError(
      axiosError.response?.data?.message ||
        "Failed to reschedule appointment",
    );
  } finally {
    setIsRescheduling(false);
  }
};

  /*
   * -----------------------------------------
   * INVALID PARAMETERS
   * -----------------------------------------
   */

  if (!hasValidParams) {
    return (
      <DoctorLayout
        title="Confirm Reschedule"
        subtitle="Review the new appointment details."
      >
        <div className="appointment-error">Invalid reschedule details</div>
      </DoctorLayout>
    );
  }

  /*
   * -----------------------------------------
   * LOADING
   * -----------------------------------------
   */

  if (isLoading) {
    return (
      <DoctorLayout
        title="Confirm Reschedule"
        subtitle="Review the new appointment details."
      >
        <div className="appointment-confirmation">
          <div className="appointment-confirmation-card">
            <p>Loading appointment details...</p>
          </div>
        </div>
      </DoctorLayout>
    );
  }

  /*
   * -----------------------------------------
   * ERROR
   * -----------------------------------------
   */

  if (error || !details) {
    return (
      <DoctorLayout
        title="Confirm Reschedule"
        subtitle="Review the new appointment details."
      >
        <div className="appointment-error">
          {error || "Appointment details not found"}
        </div>
      </DoctorLayout>
    );
  }

  /*
   * -----------------------------------------
   * CONFIRMATION UI
   * -----------------------------------------
   */

  return (
    <DoctorLayout
      title="Confirm Reschedule"
      subtitle="Review the new appointment details before confirming."
    >
      <div className="appointment-confirmation-card">
        <div className="appointment-confirmation-header">
          <span>RESCHEDULE SUMMARY</span>

          <h2>Confirm Appointment Reschedule</h2>

          <p>Please review the new date and time before confirming.</p>
        </div>

        {/* -----------------------------------------
            PATIENT
        ------------------------------------------ */}

        <div className="appointment-detail">
          <span>Patient</span>

          <strong>{details.patienttName}</strong>
        </div>

        {/* -----------------------------------------
            PATIENT EMAIL
        ------------------------------------------ */}

        <div className="appointment-detail">
          <span>Gender</span>

          <strong>{details.gender}</strong>
        </div>

        {/* -----------------------------------------
            APPOINTMENT CODE
        ------------------------------------------ */}

        <div className="appointment-detail">
          <span>Patient Code</span>

          <strong>{details.patientCode}</strong>
        </div>

        {/* -----------------------------------------
            NEW DATE
        ------------------------------------------ */}

        <div className="appointment-detail">
          <span>New Date</span>

          <strong>{new Date(details.date).toLocaleDateString()}</strong>
        </div>

        {/* -----------------------------------------
            NEW TIME
        ------------------------------------------ */}

        <div className="appointment-detail">
          <span>New Time</span>

          <strong>
            {details.startTime} - {details.endTime}
          </strong>
        </div>

        {/* -----------------------------------------
            ERROR
        ------------------------------------------ */}

        {rescheduleError && (
          <div className="appointment-error">{rescheduleError}</div>
        )}

        {/* -----------------------------------------
            CONFIRM BUTTON
        ------------------------------------------ */}

        <button
          type="button"
          className="confirm-appointment-button"
          onClick={handleConfirmReschedule}
          disabled={isRescheduling}
        >
          {isRescheduling ? "Rescheduling..." : "Confirm Reschedule"}
        </button>
      </div>
    </DoctorLayout>
  );
};

export default DoctorRescheduleConfirmationPage;
