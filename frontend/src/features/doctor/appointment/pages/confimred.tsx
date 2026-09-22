import { useEffect } from "react";
import "@/styles/patient/appointmnetConfirmed.css";

import { useLocation, useNavigate } from "react-router-dom";

import DoctorLayout from "@/layout/DoctorLayout";
import type { AppointmentSinglePage } from "@/features/patient/appointment/type/appointmentSinglePage";

interface LocationState {
  appointment?: AppointmentSinglePage;
}

const AppointmentRescheduledPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;

  const appointment = state?.appointment;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/doctor/dashboard", {
        replace: true,
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <DoctorLayout
      title="Appointment Rescheduled"
      subtitle="The appointment has been successfully rescheduled."
    >
      <div className="appointment-confirmed-page">
        <div className="appointment-confirmed-card">
          <div className="appointment-success-icon">✓</div>

          <h2>Appointment Rescheduled!</h2>

          <p>
            The appointment has been successfully rescheduled.
          </p>

          {appointment && (
            <div className="appointment-confirmed-details">
              <div>
                <span>Appointment Code</span>
                <strong>{appointment.appointmentCode}</strong>
              </div>

              <div>
                <span>Date</span>
                <strong>
                  {new Date(
                    appointment.appointmentCode,
                  ).toLocaleDateString()}
                </strong>
              </div>

              <div>
                <span>Time</span>
                <strong>
                  {appointment.startTime} - {appointment.endTime}
                </strong>
              </div>
            </div>
          )}

          <p className="redirect-message">
            Redirecting to dashboard in 5 seconds...
          </p>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default AppointmentRescheduledPage;