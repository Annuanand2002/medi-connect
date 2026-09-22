import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  UserRound,
} from "lucide-react";
import { fetchAppointmentDetails } from "../redux/appointmentSinglePage.thunk";
import DoctorLayout from "@/layout/DoctorLayout";

const AppointmentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { singleAppointment, isLoading, error } = useAppSelector(
    (state) => state.appointmentDetailsPage,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAppointmentDetails(id));
    }
  }, [id, dispatch]);

  // Loading
  if (isLoading) {
    return (
      <DoctorLayout
        title="Appointment Details"
        subtitle="View your appointment details"
      >
        <div className="appointment-loading">
          Loading appointment...
        </div>
      </DoctorLayout>
    );
  }

  // Error
  if (error) {
    return (
      <DoctorLayout
        title="Appointment Details"
        subtitle="View your appointment details"
      >
        <div className="appointment-error">{error}</div>
      </DoctorLayout>
    );
  }

  // No appointment
  if (!singleAppointment) {
    return (
      <DoctorLayout
        title="Appointment Details"
        subtitle="View your appointment details"
      >
        <div className="appointment-empty">
          Appointment not found
        </div>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout
      title="Appointment Details"
      subtitle="View your appointment details"
    >
      <div className="appointment-page">

        {/* Back button */}
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/doctor/appointments")}
        >
          <ArrowLeft size={18} />
          <span>Back to Appointments</span>
        </button>

        {/* Header */}
        <div className="appointment-header">
          <div>
            <h2>Appointment Details</h2>
            <p>Review your consultation information</p>
          </div>

          <span
            className={`appointment-status appointment-status-${singleAppointment.status.toLowerCase()}`}
          >
            {singleAppointment.status}
          </span>
        </div>

        {/* Appointment Card */}
        <div className="appointment-card">

          {/* Patient */}
          <div className="appointment-doctor">
            <div className="doctor-avatar">
              <strong>
                {singleAppointment.patientName
                  .charAt(0)
                  .toUpperCase()}
              </strong>
            </div>

            <div className="doctor-info">
              <span className="info-label">Patient Name</span>

              <h3>{singleAppointment.patientName}</h3>

              <p>
                Email:{" "}
                <strong>{singleAppointment.email}</strong>
              </p>
            </div>
          </div>

          <div className="appointment-divider" />

          {/* Appointment information */}
          <div className="appointment-info-grid">

            {/* Date */}
            <div className="appointment-info-item">
              <div className="info-icon">
                <CalendarDays size={20} />
              </div>

              <div>
                <span className="info-label">
                  Appointment Date
                </span>

                <strong>
                  {new Date(
                    singleAppointment.appointmentDate,
                  ).toLocaleDateString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </strong>
              </div>
            </div>

            {/* Time */}
            <div className="appointment-info-item">
              <div className="info-icon">
                <Clock size={20} />
              </div>

              <div>
                <span className="info-label">
                  Appointment Time
                </span>

                <strong>
                  {singleAppointment.startTime} -{" "}
                  {singleAppointment.endTime}
                </strong>
              </div>
            </div>

            {/* Gender */}
            <div className="appointment-info-item">
              <div className="info-icon">
                <UserRound size={20} />
              </div>

              <div>
                <span className="info-label">Gender</span>

                <strong>
                  {singleAppointment.gender}
                </strong>
              </div>
            </div>

            {/* Appointment code */}
            <div className="appointment-info-item">
              <div className="info-icon">
                <span className="info-code">#</span>
              </div>

              <div>
                <span className="info-label">
                  Appointment Code
                </span>

                <strong>
                  {singleAppointment.appointmentCode}
                </strong>
              </div>
            </div>
          </div>

          {/* Reschedule button */}
          {singleAppointment.status === "BOOKED" && (
            <>
              <div className="appointment-divider" />

              <div className="appointment-actions">
                <button
                  type="button"
                  className="confirm-appointment-button"
                  onClick={() =>
                    navigate(
                      `/doctor/appointments/reschedule/${id}`,
                    )
                  }
                >
                  <CalendarDays size={18} />
                  Reschedule Appointment
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </DoctorLayout>
  );
};

export default AppointmentDetailsPage;