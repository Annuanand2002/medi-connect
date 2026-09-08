import { useEffect, useState } from "react";
import "@/styles/patient/appointmentSinglePage.css";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock, UserRound } from "lucide-react";

import PatientLayout from "@/layout/PatientLayout";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

import { fetchSingleAppointment } from "../redux/appointmentSinglePage";
import { cancelAppointment } from "../api/appointment";

const AppointmentSinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { singleAppointment, isLoading, error } = useAppSelector(
    (state) => state.appointmentSinglePage,
  );

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleAppointment(id));
    }
  }, [id, dispatch]);

  // Loading
  if (isLoading) {
    return (
      <PatientLayout
        title="Appointment Details"
        subtitle="View your appointment details"
      >
        <div className="appointment-loading">Loading appointment...</div>
      </PatientLayout>
    );
  }

  // Error
  if (error) {
    return (
      <PatientLayout
        title="Appointment Details"
        subtitle="View your appointment details"
      >
        <div className="appointment-error">{error}</div>
      </PatientLayout>
    );
  }

  // No appointment
  if (!singleAppointment) {
    return (
      <PatientLayout
        title="Appointment Details"
        subtitle="View your appointment details"
      >
        <div className="appointment-empty">Appointment not found</div>
      </PatientLayout>
    );
  }

  const appointmentDateTime = new Date(
    `${
      new Date(singleAppointment.date).toISOString().split("T")[0]
    }T${singleAppointment.startTime}`,
  );

  const now = new Date();

  const oneHourBeforeAppointment = new Date(
    appointmentDateTime.getTime() - 60 * 60 * 1000,
  );

  const canModifyAppointment =
    (singleAppointment.status === "BOOKED" ||
      singleAppointment.status === "RESCHEDULED") &&
    now < oneHourBeforeAppointment;

  const handleReschedule = () => {
    if (!id || !singleAppointment.doctorId) {
      return;
    }

    navigate(
      `/patient/appointment/reschedule/${id}/dates/${singleAppointment.doctorId}`,
    );
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    if (!isCancelling) {
      setShowCancelModal(false);
    }
  };

  const handleConfirmCancel = async () => {
    console.log("Appointment ID from URL:", id);

    if (!id) {
      return;
    }

    try {
      setIsCancelling(true);

      await cancelAppointment(id);

      setShowCancelModal(false);

      dispatch(fetchSingleAppointment(id));
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <PatientLayout
      title="Appointment Details"
      subtitle="View your appointment details"
    >
      <div className="appointment-page">
        {/* Back button */}
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/patient/appointment-history")}
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
          {/* Doctor */}
          <div className="appointment-doctor">
            <div className="doctor-avatar">
              <strong>
                {singleAppointment.doctorName.charAt(0).toUpperCase()}
              </strong>
            </div>

            <div className="doctor-info">
              <span className="info-label">Consultation with</span>

              <h3>Dr. {singleAppointment.doctorName}</h3>

              <p>
                Doctor Code: <strong>{singleAppointment.doctorCode}</strong>
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
                <span className="info-label">Appointment Date</span>

                <strong>
                  {new Date(singleAppointment.date).toLocaleDateString(
                    undefined,
                    {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    },
                  )}
                </strong>
              </div>
            </div>

            {/* Time */}
            <div className="appointment-info-item">
              <div className="info-icon">
                <Clock size={20} />
              </div>

              <div>
                <span className="info-label">Appointment Time</span>

                <strong>
                  {singleAppointment.startTime} - {singleAppointment.endTime}
                </strong>
              </div>
            </div>

            {/* Department */}
            <div className="appointment-info-item">
              <div className="info-icon">
                <UserRound size={20} />
              </div>

              <div>
                <span className="info-label">Department</span>

                <strong>{singleAppointment.department}</strong>
              </div>
            </div>

            {/* Appointment code */}
            <div className="appointment-info-item">
              <div className="info-icon">
                <span className="info-code">#</span>
              </div>

              <div>
                <span className="info-label">Appointment Code</span>

                <strong>{singleAppointment.appointmentCode}</strong>
              </div>
            </div>
          </div>

          {/* Actions */}
          {(singleAppointment.status === "BOOKED" ||
            singleAppointment.status === "RESCHEDULED") && (
            <>
              <div className="appointment-divider" />

              <div className="appointment-actions">
                <div className="action-message">
                  {canModifyAppointment ? (
                    <span>You can modify this appointment.</span>
                  ) : (
                    <span>
                      Changes are disabled within 1 hour of the appointment.
                    </span>
                  )}
                </div>

                <div className="action-buttons">
                  {/* Reschedule only for BOOKED */}
                  {singleAppointment.status === "BOOKED" && (
                    <button
                      type="button"
                      className="reschedule-button"
                      onClick={handleReschedule}
                      disabled={!canModifyAppointment}
                    >
                      Reschedule
                    </button>
                  )}

                  {/* Cancel for BOOKED and RESCHEDULED */}
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={handleCancel}
                    disabled={!canModifyAppointment}
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ======================================
            CANCEL CONFIRMATION MODAL
        ====================================== */}

        {showCancelModal && (
          <div
            className="cancel-modal-overlay"
            onClick={handleCloseCancelModal}
          >
            <div
              className="cancel-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="cancel-modal-icon">!</div>

              <h3>Cancel Appointment?</h3>

              <p>
                Are you sure you want to cancel your appointment with{" "}
                <strong>Dr. {singleAppointment.doctorName}</strong>?
              </p>

              <div className="cancel-modal-actions">
                {/* NO */}
                <button
                  type="button"
                  className="cancel-modal-no"
                  onClick={handleCloseCancelModal}
                  disabled={isCancelling}
                >
                  No, Keep Appointment
                </button>

                {/* YES */}
                <button
                  type="button"
                  className="cancel-modal-yes"
                  onClick={handleConfirmCancel}
                  disabled={isCancelling}
                >
                  {isCancelling ? "Cancelling..." : "Yes, Cancel"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
};

export default AppointmentSinglePage;
